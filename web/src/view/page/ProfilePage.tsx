import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import { format, parseISO } from 'date-fns'
import * as React from 'react'
import { Card } from 'react-bootstrap'
import { Colors } from '../../../../common/src/colors'
import { fetchUserProfile } from '../../graphql/fetchUsers'
import { FetchUserProfile, FetchUserProfileVariables } from '../../graphql/query.gen'
import { H1, H2, H3, H5 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
interface ProfilePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProfilePage(props: ProfilePageProps) {
  const userId = 1
  const { loading, data } = useQuery<FetchUserProfile, FetchUserProfileVariables>(fetchUserProfile, {
    variables: { id: userId },
  })
  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.userProfile) {
    return <div> user does not exist </div>
  }
  const getActiveEvents = () => data.userProfile?.hostEvents.filter(event => event?.eventStatus === 'OPEN')
  const getInactiveEvents = () =>
    data.userProfile?.hostEvents.filter(event => event?.eventStatus === 'CANCELLED' || event?.eventStatus === 'CLOSED')
  return (
    <Page>
      <H1 style={{ color: 'Navy', textAlign: 'center' }}>My Profile</H1>
      <Spacer $h6 />
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
            {getActiveEvents()?.map((event, i) => (
              // <div key={i}> {(event?.title, event?.description)} </div>

              <div key={i}>
                <Card style={{ width: '30rem', backgroundColor: '#F2D9D9' }}>
                  <div style={{ textAlign: 'center' }}>
                    <H2>{event?.title}</H2>
                    <H3>{event?.description}</H3>
                  </div>
                  <Content>
                    <RContent>
                      <H5>Date: {format(parseISO(event?.startTime), 'MMM do yyyy')}</H5>
                      <H5>Location:</H5>
                    </RContent>
                    <LContent>
                      <H5>
                        Time: {format(parseISO(event?.startTime), 'h:mm b')} -{' '}
                        {format(parseISO(event?.endTime), 'h:mm b')}
                      </H5>
                      <H5># of People: {event?.guestCount} confirmed</H5>
                      <Content></Content>
                    </LContent>
                  </Content>
                </Card>
                <Spacer $h5 />
              </div>
            ))}
          </LContent>
        </Hero>
        <Hero>
          <H2>Previous Events</H2>
          <Spacer $h3 />
          <RContent>
            {getInactiveEvents()?.map((event, i) => (
              <div key={i}>
                <Card style={{ width: '30rem', backgroundColor: '#F2D9D9' }}>
                  <div style={{ textAlign: 'center' }}>
                    <H2>{event?.title}</H2>
                    <H3>{event?.description}</H3>
                  </div>
                  <Content>
                    <RContent>
                      <H5>Date: {format(parseISO(event?.startTime), 'MMM do yyyy')}</H5>
                      <H5>Location:</H5>
                    </RContent>
                    <LContent>
                      <H5>
                        Time: {format(parseISO(event?.startTime), 'h:mm b')} -{' '}
                        {format(parseISO(event?.endTime), 'h:mm b')}
                      </H5>
                      <H5># of People: {event?.guestCount} confirmed</H5>
                      <Content></Content>
                    </LContent>
                  </Content>
                </Card>
                <Spacer $h5 />
              </div>
            ))}
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
