import http from 'k6/http'
import { sleep } from 'k6'
import uuid from './uuid.js'
const JBRUIN_ID = 1

export const options = {
  scenarios: {
    standard: {
      // executor: 'constant-arrival-rate',
      // rate: '300',
      // timeUnit: '1m',
      // duration: '1m',
      // preAllocatedVUs: 0,
      // maxVUs: 100,
      ////////////////////////
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '60s', target: 200 },
        { duration: '60s', target: 0 },
      ],
      gracefulRampDown: '60s',
      ////////////////////////
      // executor: 'constant-vus',
      // duration: '60s',
      // vus: 1,
    },
  },
}

// setup code
export function setup() {
  // Login and profile
  var payload = JSON.stringify({
    email: 'jbruin@ucla.edu',
    password: 'password',
  })
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  http.post('http://localhost:3000/auth/login', payload, params)
  var jar = http.cookieJar()
  let cookies = jar.cookiesForURL('http://localhost:3000')
  return { authToken: cookies.authToken[0] }
}

export default function () {
  var jar = http.cookieJar()

  const id = uuid.v4()

  // Create new account
  var payload = JSON.stringify({
    email: `${id}@ucla.edu`,
    password: 'password',
    bio: 'bio',
    name: `${id}`,
    phoneNumber: '123456789',
  })
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  http.post('http://localhost:3000/auth/createUser', payload, params)
  let cookies = jar.cookiesForURL('http://localhost:3000')
  const newacc_cookie = cookies.authToken[0]

  // Update params to use auth token
  const new_acc_params = {
    headers: {
      'Content-Type': 'application/json',
    },
    cookies: {
      authToken: newacc_cookie,
    },
  }

  // Get the new account's id
  var ctx_payload = JSON.stringify({
    operationName: 'FetchUserContext',
    variables: {},
    query: 'query FetchUserContext {\n  self {\n    id\n    name\n    userType\n    __typename\n  }\n}\n',
  })
  const ctx_res = http.post('http://localhost:3000/graphql', ctx_payload, new_acc_params)
  const newacc_id = ctx_res.json('data.self.id')

  // Go to home page, look at events
  sleep(1)

  http.get('http://localhost:3000/app/index', {
    cookies: newacc_cookie,
  })

  sleep(5)
  // Look at random event on the event page
  const rand_event = Math.floor(Math.random() * 2000)
  http.get(`http://localhost:3000/app/eventdetails?eventid=${rand_event}`)

  sleep(2)
  // Send a request to jbruin
  var request_payload = JSON.stringify({
    operationName: 'CreateRequest',
    variables: {
      eventID: 1,
      guestID: newacc_id,
      hostID: JBRUIN_ID,
    },
    query:
      'mutation CreateRequest($eventID: Int!, $guestID: Int!, $hostID: Int!) {\n  createRequest(request_input: {eventID: $eventID, guestID: $guestID, hostID: $hostID}) {\n    id\n    __typename\n  }\n}\n',
  })

  const request_res = http.post('http://localhost:3000/graphql', request_payload, new_acc_params)
  const request_id = request_res.json('data.createRequest.id')

  sleep(1)
  // Create new event
  const create_event_payload = JSON.stringify({
    operationName: 'CreateEvent',
    variables: {
      eventTitle: `${id}'s event`,
      eventDesc: 'desc',
      eventStartTime: '2020-11-26T20:00',
      eventEndTime: '2020-11-26T22:00',
      maxGuestCount: '100',
      eventGuestCount: '1',
      eventLocationID: 1,
      eventHostID: newacc_id,
    },
    query:
      'mutation CreateEvent($eventTitle: String!, $eventDesc: String!, $eventStartTime: Date!, $eventEndTime: Date!, $maxGuestCount: String!, $eventGuestCount: String!, $eventLocationID: Int!, $eventHostID: Int!) {\n  createEvent(event_input: {eventTitle: $eventTitle, eventDesc: $eventDesc, eventEndTime: $eventEndTime, eventStartTime: $eventStartTime, eventMaxGuestCount: $maxGuestCount, eventGuestCount: $eventGuestCount, eventLocationID: $eventLocationID, eventHostID: $eventHostID}) {\n    id\n    title\n    __typename\n  }\n}\n',
  })

  http.post('http://localhost:3000/graphql', create_event_payload, new_acc_params)

  sleep(1)
  // Logout
  http.post(
    'http://localhost:3000/auth/logout',
    {},
    {
      cookies: {
        authToken: newacc_cookie,
      },
    }
  )

  // Login to jbruin
  // Race condition somewhere in here, don't login, just login once and share session token

  // var jbruin_login = JSON.stringify({
  //   email: 'jbruin@ucla.edu',
  //   password: 'password',
  // })
  // http.post('http://localhost:3000/auth/login', jbruin_login, params)
  // cookies = jar.cookiesForURL('http://localhost:3000')
  // const jbruin_cookie = cookies.authToken[0]

  const jbruin_cookie = data.authToken
  const jbruin_params = {
    headers: {
      'Content-Type': 'application/json',
    },
    cookies: {
      authToken: jbruin_cookie,
    },
  }
  // Loaded this page by default
  sleep(1)

  http.get('http://localhost:3000/app/index', {
    cookies: jbruin_cookie,
  })

  sleep(1)
  // Check profile page
  http.get('http://localhost:3000/app/profile', {
    cookies: {
      authToken: jbruin_cookie,
    },
  })

  sleep(3)
  // Check requests page
  http.get('http://localhost:3000/app/requests', {
    cookies: {
      authToken: jbruin_cookie,
    },
  })

  sleep(1)

  const accept_chance = Math.random()
  let accept = false
  if (accept_chance > 0.5) {
    accept = true
  }

  const accept_request_mutation =
    'mutation AcceptRequest($requestId: Int!) {\n  acceptRequest(requestId: $requestId)\n}\n'
  const reject_request_mutation =
    'mutation RejectRequest($requestId: Int!) {\n  rejectRequest(requestId: $requestId)\n}\n'

  const modify_request_payload = JSON.stringify({
    operationName: accept ? 'AcceptRequest' : 'RejectRequest',
    variables: {
      requestId: request_id,
    },
    query: accept ? accept_request_mutation : reject_request_mutation,
  })

  http.post('http://localhost:3000/graphql', modify_request_payload, jbruin_params)
}
