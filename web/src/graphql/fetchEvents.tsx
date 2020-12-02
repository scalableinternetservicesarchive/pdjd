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
        id
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

export const fetchActiveEventsPages = gql`
  query FetchActiveEventsPages {
    activeEventsPages
  }
`

export const fetchActiveEventsPage = gql`
  query FetchActiveEventsPage($page: Int!) {
    activeEventsPage(page: $page) {
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
        id
        name
        email
      }
      guestCount
    }
  }
`
