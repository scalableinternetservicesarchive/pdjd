import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { Event } from '../entities/Event'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { EventStatus, Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
  request: Request
  response: Response
  pubsub: PubSub
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    activeEvents: () =>
      Event.find({
        where: { eventStatus: EventStatus.Open },
        relations: ['host', 'location', 'location.building'],
      }), // find only open events
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

    // static findOne<T extends BaseEntity>(this: ObjectType<T>, options?: FindOneOptions<T>): Promise<T | undefined>;

    // static create<T extends BaseEntity>(this: ObjectType<T>, entityLikeArray: DeepPartial<T>[]): T[];

    createEvent: async (_, { event_input }, ctx) => {
      // const event = check(await Event.create({ id: event_input.eventId }))
      const event = new Event()
      event.id = event_input.eventId
      event.title = event_input.eventTitle
      event.description = event_input.eventDesc
      event.startTime = new Date(event_input.eventStartTime)
      event.endTime =  new Date(event_input.eventEndTime)
      event.maxGuestCount = event_input.eventMaxGuestCount
      event.eventStatus=event_input.eventStatus
      event.location.id= event_input.eventLocationID
      event.host.id=event_input.eventHostID
      event.guestCount=event_input.eventGuestCount
      const myEvent = check(await Event.create(event))
      await myEvent.save()
      // ctx.pubsub.publish('NEW_EVENT_' + event_input.eventId, myEvent)
      ctx.pubsub.publish('NEW_EVENT_' + event_input.eventId, myEvent)
      //ctx.pubsub.publish('NEW_EVENT_' + event.id, myEvent)
      return myEvent
    },
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
