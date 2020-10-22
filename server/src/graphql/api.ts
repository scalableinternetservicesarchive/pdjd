import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { Building } from '../entities/Building'
import { Event } from '../entities/Event'
import { Request } from '../entities/Request'
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
    building: async (_, { buildingID }) =>
      (await Building.findOne({ where: { id: buildingID }, relations: ['locations'] })) || null,
    buildings: () => Building.find(),
    userProfile: async (_, { id }) =>
      (await User.findOne({
        where: { id },
        relations: ['hostEvents', 'guestEvents'],
      })) || null,
    userHostRequests: async (_, { id }) =>
      (await Request.find({
        where: { host: id },
        relations: ['event', 'host', 'guest'],
      })) || null,
    userGuestRequests: async (_, { id }) =>
      (await Request.find({
        where: { guest: id },
        relations: ['event', 'host', 'guest'],
      })) || null,
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
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
