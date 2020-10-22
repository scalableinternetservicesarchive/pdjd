import { gql } from '@apollo/client'

export const fetchAllActiveEvents = gql`
  query FetchAllActiveEvents {
    activeEvents {
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
