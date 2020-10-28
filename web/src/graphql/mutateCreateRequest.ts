import { ApolloClient, gql } from '@apollo/client'
import { CreateRequest, CreateRequestVariables } from './query.gen'

const createRequest = gql`
  mutation CreateRequest($eventID: Int!, $guestID: Int!) {
    createRequest(request_input: { eventID: $eventID, guestID: $guestID }) {
      id
    }
  }
`

export function create_request(client: ApolloClient<any>, request_input: CreateRequestVariables) {
  return client.mutate<CreateRequest, CreateRequestVariables>({
    mutation: createRequest,
    variables: {
      eventID: request_input.eventID,
      guestID: request_input.guestID,
    },
  })
}
