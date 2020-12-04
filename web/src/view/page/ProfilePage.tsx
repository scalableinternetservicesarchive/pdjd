import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Colors } from '../../../../common/src/colors'
import { EventDetailsCard } from '../../components/eventDetailsCard'
import { fetchUserProfile } from '../../graphql/fetchUsers'
import {
  FetchUserProfile,
  FetchUserProfileVariables,
  FetchUserProfile_userProfile_hostEvents
} from '../../graphql/query.gen'
import { H1, H2, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
interface ProfilePageProps extends RouteComponentProps, AppRouteParams {}

function EventList(props: { events: FetchUserProfile_userProfile_hostEvents[] | undefined; host: string }) {
  if (!props.events) {
    return <H3>No events available.</H3>
  }
  return (
    <div>
      {props.events.map((event, i) => (
        <div key={i}>
          <EventDetailsCard
            id={event.id}
            title={event.title}
            description={event.description}
            startTime={event.startTime}
            endTime={event.endTime}
            location={event.location.building.name + ' ' + event.location.room}
            numPeople={String(event.guestCount) + '/' + String(event.maxGuestCount)}
            host={props.host}
            width="30rem"
          />
          <Spacer $h5 />
        </div>
      ))}
    </div>
  )
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProfilePage(props: ProfilePageProps) {
  const { user } = React.useContext(UserContext)
  const userId = Number(user?.id)
  const { loading, data } = useQuery<FetchUserProfile, FetchUserProfileVariables>(fetchUserProfile, {
    variables: { id: userId },
  })
  if (!user) {
    return (
      <Page>
        <div>No logged in user</div>
      </Page>
    )
  }
  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.userProfile) {
    return <div> user does not exist </div>
  }

  const activeEvents = data.userProfile.hostEvents?.filter(event => event?.eventStatus === 'OPEN')
  const inactiveEvents = data.userProfile.hostEvents?.filter(
    event => event?.eventStatus === 'CANCELLED' || event?.eventStatus === 'CLOSED'
  )
  return (
    <Page>
      <H1 style={{ textAlign: 'center' }}>{data.userProfile.name}</H1>
      <Spacer $h2 />
      <Hero>
        <H2 style={{ color: 'Navy' }}>Bio</H2>
        <Spacer $h3 />
        <H3>{data.userProfile.bio}</H3>
        <Spacer $h6 />
        <Content>
          <RContent>
            <H2 style={{ color: 'Navy' }}>Email</H2>
            <Spacer $h3 />
            <H3 style={{ marginRight: 20 }}>{data.userProfile.email}</H3>
          </RContent>
          <LContent>
            <H2 style={{ color: 'Navy' }}>Phone</H2>
            <Spacer $h3 />
            <H3 style={{ marginLeft: 20 }}>{data.userProfile.phoneNumber}</H3>
          </LContent>
        </Content>
      </Hero>

      <Content>
        <Hero>
          <H2>Upcoming Events</H2>
          <Spacer $h3 />
          <LContent>
            <EventList host={data.userProfile.name} events={activeEvents} />
          </LContent>
        </Hero>
        <Hero>
          <H2>Previous Events</H2>
          <Spacer $h3 />
          <RContent>
            <EventList host={data.userProfile.name} events={inactiveEvents} />
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

// const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
//   borderLeftColor: Colors[p.$color || 'lemon'] + '!important',
//   borderLeftWidth: '3px',
// }))

// const TD = style('td', 'pa1', p => ({
//   color: p.$theme.textColor(),
// }))
