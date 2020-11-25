import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
  scenarios: {
    standard: {
      executor: 'constant-arrival-rate',
      rate: '300',
      timeUnit: '1m',
      duration: '1m',
      preAllocatedVUs: 0,
      maxVUs: 100,
      // executor: 'ramping-vus',
      // startVUs: 0,
      // stages: [
      //   { duration: '30s', target: 50 },
      //   { duration: '30s', target: 0 },
      // ],
      // gracefulRampDown: '10s',
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
  console.log(cookies.authToken[0])
  return { authToken: cookies.authToken[0] }
}

export default function (data) {
  // Create event
  const payload = JSON.stringify({
    operationName: 'FetchAllActiveEvents',
    variables: {},
    query:
      'query FetchAllActiveEvents {\n  activeEvents {\n    id\n    title\n    description\n    startTime\n    endTime\n    maxGuestCount\n    location {\n      building {\n        name\n        __typename\n      }\n      room\n      __typename\n    }\n    host {\n      id\n      name\n      email\n      __typename\n    }\n    guestCount\n    __typename\n  }\n}\n',
  })
  // let jar = http.cookieJar()
  // jar.set('http://localhost:3000', 'my_cookie', authToken, {
  //   domain: 'localhost:3000',
  //   path: '/',
  //   secure: true,
  //   max_age: 600,
  // })

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    cookies: {
      authToken: data.authToken,
    },
  }
  http.post('http://localhost:3000/graphql', payload, params)

  sleep(Math.random() * 3)
}
