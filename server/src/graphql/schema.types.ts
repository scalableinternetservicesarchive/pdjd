import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
}

export interface Building {
  __typename?: 'Building'
  id: Scalars['Int']
  name: Scalars['String']
  locations: Array<Location>
}

export interface Event {
  __typename?: 'Event'
  id: Scalars['Int']
  title: Scalars['String']
  description: Scalars['String']
  startTime: Scalars['Date']
  endTime: Scalars['Date']
  maxGuestCount: Scalars['Int']
  eventStatus: EventStatus
  host: User
  location: Location
  guests: Array<User>
  requests: Array<Request>
  isStarted: Scalars['Boolean']
  isCompleted: Scalars['Boolean']
  guestCount: Scalars['Int']
}

export interface EventInput {
  eventTitle: Scalars['String']
  eventDesc: Scalars['String']
  eventStartTime: Scalars['Date']
  eventEndTime: Scalars['Date']
  eventMaxGuestCount: Scalars['String']
  eventLocationID: Scalars['Int']
  eventHostID: Scalars['Int']
  eventGuestCount: Scalars['String']
}

export enum EventStatus {
  Open = 'OPEN',
  Closed = 'CLOSED',
  Cancelled = 'CANCELLED',
}

export interface Location {
  __typename?: 'Location'
  id: Scalars['Int']
  building: Building
  room: Scalars['String']
  events: Array<Event>
}

export interface Mutation {
  __typename?: 'Mutation'
  answerSurvey: Scalars['Boolean']
  nextSurveyQuestion?: Maybe<Survey>
  acceptRequest: Scalars['Boolean']
  rejectRequest: Scalars['Boolean']
  createEvent?: Maybe<Event>
  cancelEvent: Scalars['Boolean']
  createRequest?: Maybe<Request>
  autoUpdateEvent?: Maybe<Scalars['Boolean']>
}

export interface MutationAnswerSurveyArgs {
  input: SurveyInput
}

export interface MutationNextSurveyQuestionArgs {
  surveyId: Scalars['Int']
}

export interface MutationAcceptRequestArgs {
  requestId: Scalars['Int']
}

export interface MutationRejectRequestArgs {
  requestId: Scalars['Int']
}

export interface MutationCreateEventArgs {
  event_input: EventInput
}

export interface MutationCancelEventArgs {
  eventId: Scalars['Int']
}

export interface MutationCreateRequestArgs {
  request_input: RequestInput
}

export interface Query {
  __typename?: 'Query'
  self?: Maybe<User>
  surveys: Array<Survey>
  survey?: Maybe<Survey>
  building?: Maybe<Building>
  buildings: Array<Building>
  userProfile?: Maybe<User>
  userHostRequests?: Maybe<Array<Request>>
  userGuestRequests?: Maybe<Array<Request>>
  events: Array<Event>
  activeEvents?: Maybe<Array<Event>>
  activeEventsPage?: Maybe<Array<Event>>
  activeEventsPages: Scalars['Int']
  eventRequests?: Maybe<Array<Request>>
  eventDetails?: Maybe<Event>
  redisTest?: Maybe<Scalars['String']>
}

export interface QuerySurveyArgs {
  surveyId: Scalars['Int']
}

export interface QueryBuildingArgs {
  buildingID: Scalars['Int']
}

export interface QueryUserProfileArgs {
  id: Scalars['Int']
}

export interface QueryUserHostRequestsArgs {
  id: Scalars['Int']
}

export interface QueryUserGuestRequestsArgs {
  id: Scalars['Int']
}

export interface QueryActiveEventsPageArgs {
  page: Scalars['Int']
}

export interface QueryEventRequestsArgs {
  eventID: Scalars['Int']
}

export interface QueryEventDetailsArgs {
  eventId: Scalars['Int']
}

export interface Request {
  __typename?: 'Request'
  id: Scalars['Int']
  event: Event
  host: User
  guest: User
  requestStatus: RequestStatus
}

export interface RequestInput {
  guestID: Scalars['Int']
  eventID: Scalars['Int']
  hostID: Scalars['Int']
}

export enum RequestStatus {
  Pending = 'PENDING',
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
}

export interface Subscription {
  __typename?: 'Subscription'
  surveyUpdates?: Maybe<Survey>
}

export interface SubscriptionSurveyUpdatesArgs {
  surveyId: Scalars['Int']
}

export interface Survey {
  __typename?: 'Survey'
  id: Scalars['Int']
  name: Scalars['String']
  isStarted: Scalars['Boolean']
  isCompleted: Scalars['Boolean']
  currentQuestion?: Maybe<SurveyQuestion>
  questions: Array<Maybe<SurveyQuestion>>
}

export interface SurveyAnswer {
  __typename?: 'SurveyAnswer'
  id: Scalars['Int']
  answer: Scalars['String']
  question: SurveyQuestion
}

export interface SurveyInput {
  questionId: Scalars['Int']
  answer: Scalars['String']
}

export interface SurveyQuestion {
  __typename?: 'SurveyQuestion'
  id: Scalars['Int']
  prompt: Scalars['String']
  choices?: Maybe<Array<Scalars['String']>>
  answers: Array<SurveyAnswer>
  survey: Survey
}

export interface User {
  __typename?: 'User'
  id: Scalars['Int']
  userType: UserType
  email: Scalars['String']
  password: Scalars['String']
  name: Scalars['String']
  bio?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  hostEvents: Array<Event>
  guestEvents: Array<Event>
  hostRequests: Array<Request>
  guestRequests: Array<Request>
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  User: ResolverTypeWrapper<User>
  Int: ResolverTypeWrapper<Scalars['Int']>
  UserType: UserType
  String: ResolverTypeWrapper<Scalars['String']>
  Event: ResolverTypeWrapper<Event>
  Date: ResolverTypeWrapper<Scalars['Date']>
  eventStatus: EventStatus
  Location: ResolverTypeWrapper<Location>
  Building: ResolverTypeWrapper<Building>
  Request: ResolverTypeWrapper<Request>
  requestStatus: RequestStatus
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Survey: ResolverTypeWrapper<Survey>
  SurveyQuestion: ResolverTypeWrapper<SurveyQuestion>
  SurveyAnswer: ResolverTypeWrapper<SurveyAnswer>
  Mutation: ResolverTypeWrapper<{}>
  SurveyInput: SurveyInput
  EventInput: EventInput
  RequestInput: RequestInput
  Subscription: ResolverTypeWrapper<{}>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  User: User
  Int: Scalars['Int']
  String: Scalars['String']
  Event: Event
  Date: Scalars['Date']
  Location: Location
  Building: Building
  Request: Request
  Boolean: Scalars['Boolean']
  Survey: Survey
  SurveyQuestion: SurveyQuestion
  SurveyAnswer: SurveyAnswer
  Mutation: {}
  SurveyInput: SurveyInput
  EventInput: EventInput
  RequestInput: RequestInput
  Subscription: {}
}

export type BuildingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Building'] = ResolversParentTypes['Building']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  locations?: Resolver<Array<ResolversTypes['Location']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type EventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  startTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  endTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  maxGuestCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  eventStatus?: Resolver<ResolversTypes['eventStatus'], ParentType, ContextType>
  host?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>
  guests?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  requests?: Resolver<Array<ResolversTypes['Request']>, ParentType, ContextType>
  isStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  guestCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type LocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  building?: Resolver<ResolversTypes['Building'], ParentType, ContextType>
  room?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  answerSurvey?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAnswerSurveyArgs, 'input'>
  >
  nextSurveyQuestion?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<MutationNextSurveyQuestionArgs, 'surveyId'>
  >
  acceptRequest?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAcceptRequestArgs, 'requestId'>
  >
  rejectRequest?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationRejectRequestArgs, 'requestId'>
  >
  createEvent?: Resolver<
    Maybe<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateEventArgs, 'event_input'>
  >
  cancelEvent?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationCancelEventArgs, 'eventId'>
  >
  createRequest?: Resolver<
    Maybe<ResolversTypes['Request']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateRequestArgs, 'request_input'>
  >
  autoUpdateEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  self?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  surveys?: Resolver<Array<ResolversTypes['Survey']>, ParentType, ContextType>
  survey?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<QuerySurveyArgs, 'surveyId'>
  >
  building?: Resolver<
    Maybe<ResolversTypes['Building']>,
    ParentType,
    ContextType,
    RequireFields<QueryBuildingArgs, 'buildingID'>
  >
  buildings?: Resolver<Array<ResolversTypes['Building']>, ParentType, ContextType>
  userProfile?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserProfileArgs, 'id'>
  >
  userHostRequests?: Resolver<
    Maybe<Array<ResolversTypes['Request']>>,
    ParentType,
    ContextType,
    RequireFields<QueryUserHostRequestsArgs, 'id'>
  >
  userGuestRequests?: Resolver<
    Maybe<Array<ResolversTypes['Request']>>,
    ParentType,
    ContextType,
    RequireFields<QueryUserGuestRequestsArgs, 'id'>
  >
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>
  activeEvents?: Resolver<Maybe<Array<ResolversTypes['Event']>>, ParentType, ContextType>
  activeEventsPage?: Resolver<
    Maybe<Array<ResolversTypes['Event']>>,
    ParentType,
    ContextType,
    RequireFields<QueryActiveEventsPageArgs, 'page'>
  >
  activeEventsPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  eventRequests?: Resolver<
    Maybe<Array<ResolversTypes['Request']>>,
    ParentType,
    ContextType,
    RequireFields<QueryEventRequestsArgs, 'eventID'>
  >
  eventDetails?: Resolver<
    Maybe<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryEventDetailsArgs, 'eventId'>
  >
  redisTest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type RequestResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Request'] = ResolversParentTypes['Request']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>
  host?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  guest?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  requestStatus?: Resolver<ResolversTypes['requestStatus'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  surveyUpdates?: SubscriptionResolver<
    Maybe<ResolversTypes['Survey']>,
    'surveyUpdates',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSurveyUpdatesArgs, 'surveyId'>
  >
}

export type SurveyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Survey'] = ResolversParentTypes['Survey']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  currentQuestion?: Resolver<Maybe<ResolversTypes['SurveyQuestion']>, ParentType, ContextType>
  questions?: Resolver<Array<Maybe<ResolversTypes['SurveyQuestion']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyAnswerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyAnswer'] = ResolversParentTypes['SurveyAnswer']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  question?: Resolver<ResolversTypes['SurveyQuestion'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyQuestion'] = ResolversParentTypes['SurveyQuestion']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  prompt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  choices?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  answers?: Resolver<Array<ResolversTypes['SurveyAnswer']>, ParentType, ContextType>
  survey?: Resolver<ResolversTypes['Survey'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  hostEvents?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>
  guestEvents?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>
  hostRequests?: Resolver<Array<ResolversTypes['Request']>, ParentType, ContextType>
  guestRequests?: Resolver<Array<ResolversTypes['Request']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Building?: BuildingResolvers<ContextType>
  Date?: GraphQLScalarType
  Event?: EventResolvers<ContextType>
  Location?: LocationResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Request?: RequestResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Survey?: SurveyResolvers<ContextType>
  SurveyAnswer?: SurveyAnswerResolvers<ContextType>
  SurveyQuestion?: SurveyQuestionResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
