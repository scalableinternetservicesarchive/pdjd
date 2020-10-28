import { gql } from '@apollo/client'

export const fetchAllActiveEvents = gql`
  query FetchAllActiveEvents {
    activeEvents {
      id
      title
      description
      startTime
      endTime
      maxGuestCount
      location {
        building {
          name
        }
        room
      }
      host {
        name
        email
      }
      guestCount
    }
  }
`

export const fetchEventRequestsGuests = gql`
  query FetchEventRequestsGuests($eventID: Int!) {
    eventRequests(eventID: $eventID) {
      guest {
        id
      }
    }
  }
`
