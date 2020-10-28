/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchAllActiveEvents
// ====================================================

export interface FetchAllActiveEvents_activeEvents_location_building {
  __typename: "Building";
  name: string;
}

export interface FetchAllActiveEvents_activeEvents_location {
  __typename: "Location";
  building: FetchAllActiveEvents_activeEvents_location_building;
  room: string;
}

export interface FetchAllActiveEvents_activeEvents_host {
  __typename: "User";
  name: string;
  email: string;
}

export interface FetchAllActiveEvents_activeEvents {
  __typename: "Event";
  title: string;
  description: string;
  startTime: any;
  endTime: any;
  maxGuestCount: number;
  location: FetchAllActiveEvents_activeEvents_location;
  host: FetchAllActiveEvents_activeEvents_host;
  guestCount: number;
}

export interface FetchAllActiveEvents {
  activeEvents: FetchAllActiveEvents_activeEvents[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchBuildings
// ====================================================

export interface FetchBuildings_buildings {
  __typename: "Building";
  id: number;
  name: string;
}

export interface FetchBuildings {
  buildings: FetchBuildings_buildings[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchLocation
// ====================================================

export interface FetchLocation_building_locations {
  __typename: "Location";
  id: number;
  room: string;
}

export interface FetchLocation_building {
  __typename: "Building";
  locations: (FetchLocation_building_locations | null)[];
}

export interface FetchLocation {
  building: FetchLocation_building | null;
}

export interface FetchLocationVariables {
  buildingID: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchUserProfile
// ====================================================

export interface FetchUserProfile_userProfile_hostEvents {
  __typename: "Event";
  id: number;
  title: string;
  description: string;
  startTime: any;
  endTime: any;
  maxGuestCount: number;
  eventStatus: eventStatus;
  isStarted: boolean;
  isCompleted: boolean;
  guestCount: number;
}

export interface FetchUserProfile_userProfile_guestEvents {
  __typename: "Event";
  id: number;
  title: string;
  description: string;
  startTime: any;
  endTime: any;
  maxGuestCount: number;
  eventStatus: eventStatus;
  isStarted: boolean;
  isCompleted: boolean;
  guestCount: number;
}

export interface FetchUserProfile_userProfile {
  __typename: "User";
  id: number;
  email: string;
  name: string;
  bio: string | null;
  phoneNumber: string | null;
  hostEvents: (FetchUserProfile_userProfile_hostEvents | null)[];
  guestEvents: (FetchUserProfile_userProfile_guestEvents | null)[];
}

export interface FetchUserProfile {
  userProfile: FetchUserProfile_userProfile | null;
}

export interface FetchUserProfileVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createNewEvent
// ====================================================

export interface createNewEvent_createEvent {
  __typename: "Event";
  id: number;
  title: string;
}

export interface createNewEvent {
  createEvent: createNewEvent_createEvent | null;
}

export interface createNewEventVariables {
  eventTitle: string;
  eventDesc: string;
  eventStartTime: any;
  eventEndTime: any;
  maxGuestCount: string;
  eventGuestCount: string;
  eventLocationID: number;
  eventHostID: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchUserContext
// ====================================================

export interface FetchUserContext_self {
  __typename: "User";
  id: number;
  name: string;
  userType: UserType;
}

export interface FetchUserContext {
  self: FetchUserContext_self | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchSurveys
// ====================================================

export interface FetchSurveys_surveys_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface FetchSurveys_surveys_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: FetchSurveys_surveys_currentQuestion_answers[];
}

export interface FetchSurveys_surveys {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: FetchSurveys_surveys_currentQuestion | null;
}

export interface FetchSurveys {
  surveys: FetchSurveys_surveys[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SurveySubscription
// ====================================================

export interface SurveySubscription_surveyUpdates_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface SurveySubscription_surveyUpdates_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: SurveySubscription_surveyUpdates_currentQuestion_answers[];
}

export interface SurveySubscription_surveyUpdates {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: SurveySubscription_surveyUpdates_currentQuestion | null;
}

export interface SurveySubscription {
  surveyUpdates: SurveySubscription_surveyUpdates | null;
}

export interface SurveySubscriptionVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchSurvey
// ====================================================

export interface FetchSurvey_survey_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface FetchSurvey_survey_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: FetchSurvey_survey_currentQuestion_answers[];
}

export interface FetchSurvey_survey {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: FetchSurvey_survey_currentQuestion | null;
}

export interface FetchSurvey {
  survey: FetchSurvey_survey | null;
}

export interface FetchSurveyVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AnswerSurveyQuestion
// ====================================================

export interface AnswerSurveyQuestion {
  answerSurvey: boolean;
}

export interface AnswerSurveyQuestionVariables {
  input: SurveyInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NextSurveyQuestion
// ====================================================

export interface NextSurveyQuestion_nextSurveyQuestion_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface NextSurveyQuestion_nextSurveyQuestion_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: NextSurveyQuestion_nextSurveyQuestion_currentQuestion_answers[];
}

export interface NextSurveyQuestion_nextSurveyQuestion {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: NextSurveyQuestion_nextSurveyQuestion_currentQuestion | null;
}

export interface NextSurveyQuestion {
  nextSurveyQuestion: NextSurveyQuestion_nextSurveyQuestion | null;
}

export interface NextSurveyQuestionVariables {
  surveyId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Survey
// ====================================================

export interface Survey_currentQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface Survey_currentQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: Survey_currentQuestion_answers[];
}

export interface Survey {
  __typename: "Survey";
  id: number;
  name: string;
  isStarted: boolean;
  isCompleted: boolean;
  currentQuestion: Survey_currentQuestion | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SurveyQuestion
// ====================================================

export interface SurveyQuestion_answers {
  __typename: "SurveyAnswer";
  answer: string;
}

export interface SurveyQuestion {
  __typename: "SurveyQuestion";
  id: number;
  prompt: string;
  choices: string[] | null;
  answers: SurveyQuestion_answers[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum eventStatus {
  CANCELLED = "CANCELLED",
  CLOSED = "CLOSED",
  OPEN = "OPEN",
}

export interface SurveyInput {
  questionId: number;
  answer: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
