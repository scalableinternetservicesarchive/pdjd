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

// // setup code
// export function setup() {
//   // Login and profile
//   var payload = JSON.stringify({
//     email: 'jbruin@ucla.edu',
//     password: 'testpassword',
//   })
//   var params = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }
//   http.post('http://localhost:3000/auth/login', payload, params)
//   var jar = http.cookieJar()
//   let cookies = jar.cookiesForURL('http://localhost:3000')
//   return { authToken: cookies.authToken[0] }
// }

export default function() {
  var payload = JSON.stringify({
    email: "test@gmail.com",
    password: "admin",
    bio: "bio",
    name: "admin",
    phoneNumber: "123456789"
  })
  var params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  http.post("http://localhost:3000/auth/createUser", payload, params)
  sleep(Math.random() * 3)
}
 // POST request
