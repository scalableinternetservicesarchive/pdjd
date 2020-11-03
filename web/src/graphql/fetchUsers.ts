import { gql } from '@apollo/client'

export const fetchUserProfile = gql`
  query FetchUserProfile($id: Int!) {
    userProfile(id: $id) {
      id
      email
      name
      bio
      phoneNumber

      hostEvents {
        id
        title
        description
        startTime
        endTime
        maxGuestCount
        eventStatus
        isStarted
        isCompleted
        guestCount
        location {
          building {
            name
          }
          room
        }
      }
      guestEvents {
        id
        title
        description
        startTime
        endTime
        maxGuestCount
        eventStatus
        isStarted
        isCompleted
        guestCount
        location {
          building {
            name
          }
          room
        }
        host {
          name
          id
        }
      }
    }
  }
`
