import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { fetchUserGuestRequests, fetchUserHostRequests } from '../../graphql/fetchRequests'
import { acceptRequest, rejectRequest } from '../../graphql/mutateRequests'
import {
  FetchUserGuestRequests,
  FetchUserGuestRequestsVariables,
  FetchUserHostRequests,
  FetchUserHostRequestsVariables,
} from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { AppRouteParams } from '../nav/route'
import { handleError } from '../toast/error'
import { toast } from '../toast/toast'
import { Page } from './Page'

interface RequestsPageProps extends RouteComponentProps, AppRouteParams {}

function RequestButton(props: { handlerFunc: () => void; buttonText: string }) {
  return <Button onClick={props.handlerFunc}>{props.buttonText}</Button>
}

function HostRequestsList() {
  // const { user } = useContext(UserContext);
  const { loading, data } = useQuery<FetchUserHostRequests, FetchUserHostRequestsVariables>(fetchUserHostRequests, {
    variables: { id: 2 },
  })
  const [userHostRequests, setUserHostRequests] = useState(data?.userHostRequests)
  useEffect(() => {
    setUserHostRequests(data?.userHostRequests)
  }, [data])

  function handleAccept(requestId: number) {
    acceptRequest(getApolloClient(), { requestId: requestId })
      .then(() => {
        toast('successfully accept the request')
        // setUserHostRequests(userHostRequests.filter(userHostRequest => userHostRequest.id != requestId))
      })
      .catch(err => {
        handleError(err)
      })
  }

  function handleReject(requestId: number) {
    rejectRequest(getApolloClient(), { requestId: requestId })
      .then(() => {
        toast('successfully reject the request')
        // setUserHostRequests(userHostRequests.filter(userHostRequest => userHostRequest.id != requestId))
      })
      .catch(err => {
        handleError(err)
      })
  }

  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.userHostRequests) {
    return <div>no requests</div>
  }

  return (
    <div>
      <div>As a host:</div>
      <div>
        {userHostRequests &&
          userHostRequests.map(userHostRequest => (
            <div key={userHostRequest.id}>
              {userHostRequest.event.title}
              <br />
              {userHostRequest.guest.name}
              <br />
              <br />
              <RequestButton handlerFunc={() => handleAccept(userHostRequest.id)} buttonText="Accept" />
              <RequestButton handlerFunc={() => handleReject(userHostRequest.id)} buttonText="Reject" />
              <br />
              <br />
            </div>
          ))}
      </div>
    </div>
  )
}

function GuestRequestsList() {
  // const { user } = useContext(UserContext);
  const { loading, data } = useQuery<FetchUserGuestRequests, FetchUserGuestRequestsVariables>(fetchUserGuestRequests, {
    variables: { id: 2 },
  })
  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.userGuestRequests) {
    return <div>no requests</div>
  }

  return (
    <div>
      <div>As a guest:</div>
      <div>
        {data.userGuestRequests.map(userGuestRequest => (
          <div key={userGuestRequest.id}>
            {userGuestRequest.event.title}
            <br />
            {userGuestRequest.requestStatus}
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RequestsPage(props: RequestsPageProps) {
  return (
    <Page>
      <HostRequestsList />
      <GuestRequestsList />
    </Page>
  )
}
