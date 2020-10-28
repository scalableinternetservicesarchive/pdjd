import { ApolloClient, gql } from '@apollo/client'
import { createNewEvent, createNewEventVariables } from './query.gen'

const createEventMutation = gql`
  mutation createNewEvent(
    $eventTitle: String!
    $eventDesc: String!
    $eventStartTime: Date!
    $eventEndTime: Date!
    $maxGuestCount: String!
    $eventGuestCount: String!
    $eventLocationID: Int!
    $eventHostID: Int!
  ) {
    createEvent(
      event_input: {
        eventTitle: $eventTitle
        eventDesc: $eventDesc
        eventEndTime: $eventEndTime
        eventStartTime: $eventStartTime
        eventMaxGuestCount: $maxGuestCount
        eventGuestCount: $eventGuestCount
        eventLocationID: $eventLocationID
        eventHostID: $eventHostID
      }
    ) {
      id
      title
    }
  }
`

export function create_new_event(client: ApolloClient<any>, event_input: createNewEventVariables) {
  return client.mutate<createNewEvent, createNewEventVariables>({
    mutation: createEventMutation,
    variables: {
      eventTitle: event_input.eventTitle,
      eventDesc: event_input.eventDesc,
      eventStartTime: event_input.eventStartTime,
      eventEndTime: event_input.eventEndTime,
      maxGuestCount: event_input.maxGuestCount,
      eventGuestCount: event_input.eventGuestCount,
      eventLocationID: event_input.eventLocationID,
      eventHostID: event_input.eventHostID,
    },
  })
}
