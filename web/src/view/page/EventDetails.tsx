import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import { format } from 'date-fns'
import * as React from 'react'
import { Card } from 'react-bootstrap'
import { getApolloClient } from '../../graphql/apolloClient'
import { fetchEventDetails } from '../../graphql/fetchEventDetails'
import { cancelEvent } from '../../graphql/mutateEvents'
import { FetchEventDetails } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H1, H2, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
interface EventDetailsPageProps extends RouteComponentProps, AppRouteParams {}

function EventDetails({ eventId }: { eventId: number }) {
  const { data } = useQuery<FetchEventDetails>(fetchEventDetails, { variables: { eventId: eventId } })

  const getLocation = () => `${data?.eventDetails?.location.building.name} ${data?.eventDetails?.location.room}`
  const getConfirmed = () => `${data?.eventDetails?.guestCount}/ ${data?.eventDetails?.maxGuestCount}`
  const getHostID = () => `${data?.eventDetails?.host.id}`
  const LOGGED_IN = 3 //TODO: set current logged in user
  //TODO: figure this out: query-hook ordering
  const isHost = Number(getHostID()) == LOGGED_IN
  const [{ showCancelButton, cancelled }, setCancelled] = React.useState({ showCancelButton: isHost, cancelled: false })
  if (!data || !data.eventDetails) {
    return null
  }
  const handleClick = function () {
    cancelEvent(getApolloClient(), {
      eventId: eventId,
    })
      .then(res => {
        if (res) console.log('Event cancelled successfully')
        else console.log('Event cancelling failed')
      })
      .catch(err => {
        console.log(err)
      })
    setCancelled({ showCancelButton: false, cancelled: true })
  }

  return (
    <Card style={{ width: '70rem', backgroundColor: '#eed9f2' }}>
      <div style={{ textAlign: 'center' }}>
        <H1>{data?.eventDetails?.title}</H1>
        <Spacer $h4 />
        <H3>{data?.eventDetails?.description}</H3>
      </div>
      <Content style={{ margin: 10 }}>
        <RContent>
          <Spacer $h8 />
          <H2>Date</H2>
          <H3>{format(Date.parse(data.eventDetails.startTime), 'MMM do yyyy')}</H3>
          <Spacer $h8 />
          <H2> Location </H2>
          <H3>{getLocation()}</H3>
          <Spacer $h8 />
          <H2> Hosted By </H2>
          <H3>{data?.eventDetails?.host.name}</H3>
        </RContent>
        <LContent>
          <Spacer $h8 />
          <H2> Time </H2>
          <H3>
            {format(Date.parse(data.eventDetails.startTime), 'h:mm b')} -
            {format(Date.parse(data.eventDetails.endTime), 'h:mm b')}
          </H3>
          <Spacer $h8 />
          <H2> # of People confirmed </H2>
          <H3>{getConfirmed()} </H3>
          <Spacer $h8 />
          <H2>Contact</H2>
          <H3>{data?.eventDetails?.host.email}</H3>
          <Spacer $h8 />
          {showCancelButton ? <Button onClick={() => handleClick()}>Cancel Event</Button> : null}
          {cancelled ? <H3> Event cancelled </H3> : null}
          <Spacer $h8 />
        </LContent>
      </Content>
    </Card>
  )
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EventDetailsPage(props: EventDetailsPageProps) {
  const getEventId = () => Number(props.location?.search.match(/\d+/g))

  const eventId = getEventId()
  return (
    <Page>
      <EventDetails eventId={eventId} />
    </Page>
  )
}

// const Hero = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
//   borderLeftColor: Colors.lemon + '!important',
//   borderRightColor: Colors.lemon + '!important',
//   borderLeftWidth: '4px',
//   borderRightWidth: '4px',
// })

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
