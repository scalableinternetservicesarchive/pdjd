import { gql } from '@apollo/client'

export const fetchEventDetails = gql`
  query FetchEventDetails($eventId: Int!) {
    eventDetails(eventId: $eventId) {
      title
      description
      startTime
      endTime
      maxGuestCount
      eventStatus
      host {
        id
        name
        email
      }
      location {
        building {
          name
        }
        room
      }
      guestCount
    }
  }
`
