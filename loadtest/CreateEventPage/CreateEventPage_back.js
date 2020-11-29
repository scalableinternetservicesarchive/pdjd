import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
  scenarios: {
    standard: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 150 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '10s',
    },
  },
}

// setup code
export function setup() {
  // Login and profile
  var payload = JSON.stringify({
    email: 'jbruin@ucla.edu',
    password: 'testpassword',
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

export default function (data) {
  // GET request
  var payload = JSON.stringify({
    operationName: 'CreateEvent',
    variables: {
      eventTitle: 'test',
      eventDesc: 'test desc',
      eventStartTime: '2020-11-06T20:20',
      eventEndTime: '2020-11-06T20:25',
      maxGuestCount: '123',
      eventGuestCount: '1',
      eventLocationID: 1,
      eventHostID: 1,
    },
    query:
      'mutation CreateEvent($eventTitle: String!, $eventDesc: String!, $eventStartTime: Date!, $eventEndTime: Date!, $maxGuestCount: String!, $eventGuestCount: String!, $eventLocationID: Int!, $eventHostID: Int!) {\n  createEvent(event_input: {eventTitle: $eventTitle, eventDesc: $eventDesc, eventEndTime: $eventEndTime, eventStartTime: $eventStartTime, eventMaxGuestCount: $maxGuestCount, eventGuestCount: $eventGuestCount, eventLocationID: $eventLocationID, eventHostID: $eventHostID}) {\n    id\n    title\n    __typename\n  }\n}\n',
  })
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
    cookies: {
      authToken: data.authToken,
    },
  }
  var res = http.post('http://localhost:3000/graphql', payload, params)
  sleep(Math.random() * 3)
}
