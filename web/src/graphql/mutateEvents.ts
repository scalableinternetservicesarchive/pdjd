import { ApolloClient, gql } from '@apollo/client'
import { CreateEvent, CreateEventVariables } from './query.gen'

const createEventMutation = gql`
  mutation CreateEvent(
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

export function createEvent(client: ApolloClient<any>, event_input: CreateEventVariables) {
  return client.mutate<CreateEvent, CreateEventVariables>({
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
