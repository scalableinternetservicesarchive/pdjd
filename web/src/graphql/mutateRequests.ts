import { ApolloClient, gql } from '@apollo/client'
import {
  AcceptRequest,
  AcceptRequestVariables,
  CreateRequest,
  CreateRequestVariables,
  RejectRequest,
  RejectRequestVariables
} from './query.gen'

const createRequestMutation = gql`
  mutation CreateRequest($eventID: Int!, $guestID: Int!, $hostID: Int!) {
    createRequest(request_input: { eventID: $eventID, guestID: $guestID, hostID: $hostID }) {
      id
    }
  }
`

const acceptRequestMutation = gql`
  mutation AcceptRequest($requestId: Int!) {
    acceptRequest(requestId: $requestId)
  }
`

const rejectRequestMutation = gql`
  mutation RejectRequest($requestId: Int!) {
    rejectRequest(requestId: $requestId)
  }
`

export function createRequest(client: ApolloClient<any>, request_input: CreateRequestVariables) {
  return client.mutate<CreateRequest, CreateRequestVariables>({
    mutation: createRequestMutation,
    variables: {
      eventID: request_input.eventID,
      guestID: request_input.guestID,
      hostID: request_input.hostID,
    },
  })
}

export function acceptRequest(client: ApolloClient<any>, requestId: AcceptRequestVariables) {
  return client.mutate<AcceptRequest, AcceptRequestVariables>({
    mutation: acceptRequestMutation,
    variables: requestId,
  })
}

export function rejectRequest(client: ApolloClient<any>, requestId: RejectRequestVariables) {
  return client.mutate<RejectRequest, RejectRequestVariables>({
    mutation: rejectRequestMutation,
    variables: requestId,
  })
}
