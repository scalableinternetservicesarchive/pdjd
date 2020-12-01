import { Request as ExpressRequest, Response } from 'express'
import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import { Redis } from 'ioredis'
import path from 'path'
import { check } from '../../../common/src/util'
import { Building } from '../entities/Building'
import { Event } from '../entities/Event'
import { Location } from '../entities/Location'
import { Request } from '../entities/Request'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { EventStatus, RequestStatus, Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

export interface Context {
  user: User | null
  request: ExpressRequest
  response: Response
  pubsub: PubSub
  redis: Redis
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    building: async (_, { buildingID }) =>
      (await Building.findOne({ where: { id: buildingID }, relations: ['locations'] })) || null,
    buildings: () => Building.find(),
    userProfile: async (_, { id }) =>
      (await User.findOne({
        where: { id },
        relations: [
          'hostEvents',
          'guestEvents',
          'hostEvents.location',
          'hostEvents.location.building',
          'guestEvents.location',
          'guestEvents.location.building',
          'guestEvents.host',
        ],
      })) || null,
    userHostRequests: async (_, { id }) =>
      (await Request.find({
        where: { host: id, requestStatus: RequestStatus.Pending },
        relations: ['event', 'host', 'guest', 'event.location', 'event.location.building'],
      })) || null,
    userGuestRequests: async (_, { id }) =>
      (await Request.find({
        where: { guest: id },
        relations: ['event', 'host', 'guest', 'event.location', 'event.location.building'],
      })) || null,
    activeEvents: async (_, args, ctx) => {
      // console.log('activeEvent')
      const redis = ctx.redis
      const redisRes = await ctx.redis.get('activeEvents')
      // find active events in the cache
      if (redisRes) {
        // console.log('has cache')
        return JSON.parse(redisRes!)
      }
      // didn't find active events in cache
      else {
        // console.log('no cache')
        const events = await Event.find({
          where: { eventStatus: EventStatus.Open },
          relations: ['host', 'location', 'location.building', 'requests', 'requests.guest'],
        }) // find only open events
        // set the cache to expire after 5 seconds
        await redis.set('activeEvents', JSON.stringify(events), 'EX', 5)
        // console.log(events)
        return events
      }
    },
    eventRequests: async (_, { eventID }) =>
      (await Request.find({
        where: { event: eventID },
        relations: ['host', 'guest'],
      })) || null,
    eventDetails: async (_, { eventId }) =>
      (await Event.findOne({
        where: { id: eventId },
        relations: ['host', 'location', 'location.building'],
      })) || null,
    redisTest: async (_, args, ctx) => {
      await ctx.redis.del('activeEvents')
      return 'random string'
    },
  },
  Mutation: {
    answerSurvey: async (_, { input }, ctx) => {
      const { answer, questionId } = input
      const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const surveyAnswer = new SurveyAnswer()
      surveyAnswer.question = question
      surveyAnswer.answer = answer
      await surveyAnswer.save()

      question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

      return true
    },
    nextSurveyQuestion: async (_, { surveyId }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
    acceptRequest: async (_, { requestId }) => {
      // todo: 1. put everything in a transaction 2. check if reaching attendee limit already
      const request = check(
        await Request.findOne({ where: { id: requestId }, relations: ['event', 'guest', 'guest.guestEvents'] })
      )
      const event = request.event

      if (event.guestCount + 1 > event.maxGuestCount) {
        request.requestStatus = RequestStatus.Rejected
        return false
      } else {
        request.requestStatus = RequestStatus.Accepted

        event.guestCount += 1

        const guest = request.guest
        guest.guestEvents.push(event)

        await request.save()
        await event.save()
        await guest.save()
        return true
      }
    },
    rejectRequest: async (_, { requestId }) => {
      const request = check(await Request.findOne({ where: { id: requestId } }))
      request.requestStatus = RequestStatus.Rejected
      await request.save()
      return true
    },
    createRequest: async (_, { request_input }) => {
      const request = new Request()
      const guest = check(await User.findOne({ where: { id: request_input.guestID } }))
      const event = check(await Event.findOne({ where: { id: request_input.eventID } }))
      const host = check(await User.findOne({ where: { id: request_input.hostID } }))

      request.host = host
      request.guest = guest
      request.event = event
      const myRequest = Request.create(request)
      await myRequest.save()

      return myRequest
    },
    // static findOne<T extends BaseEntity>(this: ObjectType<T>, options?: FindOneOptions<T>): Promise<T | undefined>;

    // static create<T extends BaseEntity>(this: ObjectType<T>, entityLikeArray: DeepPartial<T>[]): T[];

    createEvent: async (_, { event_input }, ctx) => {
      // const event = check(await Event.create({ id: event_input.eventId }))
      const location = check(await Location.findOne({ where: { id: event_input.eventLocationID } }))

      const host = check(await User.findOne({ where: { id: event_input.eventHostID } }))

      const event = new Event()

      event.title = event_input.eventTitle
      event.description = event_input.eventDesc
      event.startTime = new Date(event_input.eventStartTime)
      event.endTime = new Date(event_input.eventEndTime)
      event.maxGuestCount = Number(event_input.eventMaxGuestCount)
      event.location = location
      event.host = host
      event.guestCount = Number(event_input.eventGuestCount)
      // const myEvent = check( Event.insert(event))
      const myEvent = Event.create(event)
      await myEvent.save()

      // ctx.pubsub.publish('NEW_EVENT_' + event_input.eventId, myEvent)
      // ctx.pubsub.publish('NEW_EVENT_' + , myEvent)
      //ctx.pubsub.publish('NEW_EVENT_' + event.id, myEvent)
      return myEvent
    },
    cancelEvent: async (_, { eventId }) => {
      const event = check(await Event.findOne({ where: { id: eventId } }))

      event.eventStatus = EventStatus.Cancelled
      await event.save()
      // TODO: subscription propagation? notify users that event is cancelled?
      return true
    },
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
