/**
 * All of our CC URL routes. You may navigate to any route by providing the route
 * and an argument specifying all it's route params, e.g. { taskId: 1, contactId: 3}.
 *
 * Some routes are special values that map to one of the other routes depending on current location context.
 */
export enum Route {
  HOME = 'app/index/:page',
  LECTURES = 'app/lectures',
  PROJECTS = 'app/projects',
  PLAYGROUND = 'app/playground',
  PLAYGROUND_APP = 'app/playground/:app',
  PROFILE = 'app/profile',
  CREATEEVENT = 'app/createevent',
  REQUESTS = 'app/requests',
  EVENTDETAILS = 'app/eventdetails/:eventId',
}

export enum PlaygroundApp {
  SURVEYS = 'Survey',
  LOGIN = 'Sign In',
  SIGNUP = 'SIGNUP',
}

export function getSurveyPath(surveyId?: number) {
  const path = getPath(Route.PLAYGROUND_APP, { app: PlaygroundApp.SURVEYS })
  return path + (surveyId ? `?surveyId=${surveyId}` : '')
}

export function getHomePath(page?: number) {
  const path = getPath(Route.HOME, { page: page })
  return path
}

export function getEventPath(eventId?: number) {
  const path = getPath(Route.EVENTDETAILS, { eventId: eventId })
  return path
}
export function getLoginPath() {
  return getPath(Route.PLAYGROUND_APP, { app: PlaygroundApp.LOGIN })
}
export function getSignupPath() {
  return getPath(Route.PLAYGROUND_APP, { app: PlaygroundApp.SIGNUP })
}
export function getPlaygroundPath() {
  return getPath(Route.PLAYGROUND)
}
/**
 * Example: getPath(ROUTES.TASK) returns "/leasing/tasks" while getPath(ROUTES.TASK, {taskId: 5}) returns "leasing/tasks/task/5".
 *
 * CAVEAT: currently this reads from window.location, the appropriate way to get location is through @reach/router.
 */
export function getPath(route: Route, arg?: Partial<ReturnType<typeof routeParams>>) {
  const routes = [route] as Route[]

  for (const r of routes) {
    const params = r.split('/').filter(t => t.startsWith(':'))
    const keys = arg ? Object.keys(arg) : []
    const paramMatches = params.map(p => keys.includes(p.replace(':', ''))).filter(m => m)
    if (keys.length !== params.length || paramMatches.length < params.length) {
      continue // every parameter must be replaced
    }

    // matching case: arg specifies all params in the URL
    let path = r.toString()
    for (const k of keys) {
      path = path.replace(':' + k, '' + (arg as any)[k])
    }
    return '/' + path
  }

  throw new Error('no matching route')
}

/**
 * Represents parameters parsed from URL routes, e.g. /leasing/tasks/task/123 parses taskId=123.
 */
export interface AppRouteParams {
  userId?: number
  app?: PlaygroundApp
  eventId?: number
  page?: number
}

/**
 * Parses string route params into numbers. Values are 0 where undefined. Useful for converting URL parameters into GraphQL query variables.
 */
export function routeParams(params: AppRouteParams) {
  return {
    userId: params.userId || 0,
    app: params.app,
    eventId: params.eventId || 0,
    page: params.page || 1,
  }
}
