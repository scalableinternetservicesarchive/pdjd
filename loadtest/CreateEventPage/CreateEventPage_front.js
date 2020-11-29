import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
  scenarios: {
    standard: {
      // executor: 'ramping-arrival-rate',
      // startRate: '50',
      // timeUnit: '1s',
      // preAllocatedVUs: 50,
      // maxVUs: 1000,
      // stages: [{ target: 100, duration: '30s' }],

      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 50 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '10s',

      // executor: 'constant-vus',
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

export default function (data) {
  // GET request
  http.get(`http://localhost:3000/app/createevent`, {
    cookies: {
      authToken: data.authToken,
    },
  })

  sleep(Math.random() * 3)
}
