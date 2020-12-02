import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Colors } from '../../../../common/src/colors'
import { EventDetailsCard } from '../../components/eventDetailsCard'
import { getApolloClient } from '../../graphql/apolloClient'
import { fetchUserGuestRequests, fetchUserHostRequests } from '../../graphql/fetchRequests'
import { acceptRequest, rejectRequest } from '../../graphql/mutateRequests'
import {
  FetchUserGuestRequests,
  FetchUserGuestRequestsVariables,
  FetchUserHostRequests,
  FetchUserHostRequestsVariables
} from '../../graphql/query.gen'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { handleError } from '../toast/error'
import { toast } from '../toast/toast'
import { Page } from './Page'

interface RequestsPageProps extends RouteComponentProps, AppRouteParams {}

// function RequestButton(props: { handlerFunc: () => void; buttonText: string }) {
//   return <Button onClick={props.handlerFunc}>{props.buttonText}</Button>
// }

function HostRequestsList() {
  const { user } = useContext(UserContext)
  const { loading, data } = useQuery<FetchUserHostRequests, FetchUserHostRequestsVariables>(fetchUserHostRequests, {
    variables: { id: Number(user?.id) },
  })
  const [userHostRequests, setUserHostRequests] = useState(data?.userHostRequests)
  useEffect(() => {
    setUserHostRequests(data?.userHostRequests)
  }, [data])

  function handleAccept(e: any, requestId: number) {
    e.stopPropagation()
    acceptRequest(getApolloClient(), { requestId: requestId })
      .then(() => {
        toast('successfully accept the request')
        setUserHostRequests(userHostRequests?.filter(userHostRequest => userHostRequest.id != requestId))
      })
      .catch(err => {
        handleError(err)
      })
  }

  function handleReject(e: any, requestId: number) {
    e.stopPropagation()
    rejectRequest(getApolloClient(), { requestId: requestId })
      .then(res => {
        if (res) {
          toast('successfully reject the request')
          setUserHostRequests(userHostRequests?.filter(userHostRequest => userHostRequest.id != requestId))
        } else {
          toast('You cannot accept this request')
        }
      })
      .catch(err => {
        handleError(err)
      })
  }

  if (!user) {
    return <div>No user currently logged in.</div>
  }

  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.userHostRequests || data.userHostRequests.length <= 0) {
    return <div>no requests</div>
  }

  return (
    <div>
      <div>
        {userHostRequests &&
          userHostRequests.map(userHostRequest => (
            <div key={userHostRequest.id}>
              <EventDetailsCard
                id={userHostRequest.event.id}
                title={userHostRequest.event.title}
                description={userHostRequest.event.description}
                startTime={userHostRequest.event.startTime}
                endTime={userHostRequest.event.endTime}
                location={userHostRequest.event.location.building.name + ' ' + userHostRequest.event.location.room}
                numPeople={String(userHostRequest.event.guestCount) + '/' + String(userHostRequest.event.maxGuestCount)}
                host={user.name}
                requestGuestName={userHostRequest.guest.name}
                acceptHandler={e => handleAccept(e, userHostRequest.id)}
                rejectHandler={e => handleReject(e, userHostRequest.id)}
                width="30rem"
              />
              <Spacer $h5 />
            </div>
          ))}
      </div>
    </div>
  )
}

function GuestRequestsList() {
  const { user } = useContext(UserContext)
  const { loading, data } = useQuery<FetchUserGuestRequests, FetchUserGuestRequestsVariables>(fetchUserGuestRequests, {
    variables: { id: Number(user?.id) },
  })
  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.userGuestRequests || data.userGuestRequests.length <= 0) {
    return <div>no requests</div>
  }

  return (
    <div>
      <div>
        {data.userGuestRequests.map(userGuestRequest => (
          <div key={userGuestRequest.id}>
            <EventDetailsCard
              id={userGuestRequest.event.id}
              title={userGuestRequest.event.title}
              description={userGuestRequest.event.description}
              startTime={userGuestRequest.event.startTime}
              endTime={userGuestRequest.event.endTime}
              location={userGuestRequest.event.location.building.name + ' ' + userGuestRequest.event.location.room}
              numPeople={String(userGuestRequest.event.guestCount) + '/' + String(userGuestRequest.event.maxGuestCount)}
              host={userGuestRequest.host.name}
              requestStatus={userGuestRequest.requestStatus}
              width="30rem"
            />
            <Spacer $h5 />
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
      <Content>
        <Hero>
          <H2>As A Host</H2>
          <Spacer $h3 />
          <LContent>
            <HostRequestsList />
          </LContent>
        </Hero>
        <Hero>
          <H2>As A Guest</H2>
          <Spacer $h3 />
          <RContent>
            <GuestRequestsList />
          </RContent>
        </Hero>
      </Content>
    </Page>
  )
}

const Hero = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderLeftColor: Colors.lemon + '!important',
  borderRightColor: Colors.lemon + '!important',
  borderLeftWidth: '4px',
  borderRightWidth: '4px',
})

const Content = style('div', 'flex-l')

const LContent = style('div', 'flex-grow-0 w-60-l mr4-l')

const RContent = style('div', 'flex-grow-0  w-60-l')
