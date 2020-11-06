/* eslint-disable prettier/prettier */
import http from "k6/http";

export const options = {
  scenarios: {
    example: {
      executor: 'ramping-arrival-rate',
      startRate: '50',
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        {target: 100, duration:'30s'}
      ]
    }
  }
}

export default function() {
    // GET request
    // http.get("http://localhost:3000/app/index");

    // POST request
    // var payload = JSON.stringify({
    //   email: "test@gmail.com",
    //   password: "admin",
    //   bio: "bio",
    //   name: "admin",
    //   phoneNumber: "123456789"
    // })
    // var params = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }
    // http.post("http://localhost:3000/auth/createUser", payload, params)

    // Login and profile
    // var payload = JSON.stringify({
    //   email: "jbruin@ucla.edu",
    //   password: "testpassword"
    // })
    // var params = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }
    // var res = http.post("http://localhost:3000/auth/login", payload, params)
    // extract authToken from res
    // var authToken = '1d0463bc-0b11-4066-b4c2-5703d2cf8ff8'
    // var res = http.get("http://localhost:3000/app/profile", {
    //   cookies: {
    //     authToken: authToken
    //   }
    // });

    // Create event
    var authToken = '1d0463bc-0b11-4066-b4c2-5703d2cf8ff8'
    var payload = JSON.stringify({
      operationName: "CreateEvent",
      variables: {
        eventTitle: "test",
        eventDesc: "test desc",
        eventStartTime: "2020-11-06T20:20",
        eventEndTime: "2020-11-06T20:25",
        maxGuestCount: "123",
        eventGuestCount: "1",
        eventLocationID: 1,
        eventHostID: 1
      },
      query: "mutation CreateEvent($eventTitle: String!, $eventDesc: String!, $eventStartTime: Date!, $eventEndTime: Date!, $maxGuestCount: String!, $eventGuestCount: String!, $eventLocationID: Int!, $eventHostID: Int!) {\n  createEvent(event_input: {eventTitle: $eventTitle, eventDesc: $eventDesc, eventEndTime: $eventEndTime, eventStartTime: $eventStartTime, eventMaxGuestCount: $maxGuestCount, eventGuestCount: $eventGuestCount, eventLocationID: $eventLocationID, eventHostID: $eventHostID}) {\n    id\n    title\n    __typename\n  }\n}\n"

    })
    var params = {
      headers: {
        'Content-Type': 'application/json',
        cookies: {
          authToken: authToken
        }
      }
    }
    var res = http.post("http://localhost:3000/graphql", payload, params)
    // console.log(res.body)
}