import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import { format } from 'date-fns'
import * as React from 'react'
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { getApolloClient } from '../../graphql/apolloClient'
import { fetchEventDetails } from '../../graphql/fetchEventDetails'
import { fetchEventRequestsGuests } from '../../graphql/fetchEvents'
import { cancelEvent } from '../../graphql/mutateEvents'
import { createRequest } from '../../graphql/mutateRequests'
import { FetchEventDetails, FetchEventRequestsGuests, FetchEventRequestsGuestsVariables } from '../../graphql/query.gen'
import { H1, H2, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { toast } from '../toast/toast'
import { Page } from './Page'
interface EventDetailsPageProps extends RouteComponentProps, AppRouteParams {}

function RequestButton(props: {
  eventID: number
  hostID: number
  parentCallback: (eventID: number, hostID: number) => void
}) {
  const eventID = props.eventID
  const { data } = useQuery<FetchEventRequestsGuests, FetchEventRequestsGuestsVariables>(fetchEventRequestsGuests, {
    variables: { eventID },
  })

  function handleClick() {
    props.parentCallback(props.eventID, props.hostID)
    setButtonActive(false)
    setRequestSent(true)
  }

  const [eventRequests, setEventRequests] = React.useState(data?.eventRequests)

  React.useEffect(() => {
    setEventRequests(data?.eventRequests)
  }, [data])

  const { user } = React.useContext(UserContext)
  const guestID = Number(user?.id)
  const [buttonActive, setButtonActive] = React.useState(true)
  const [requestSent, setRequestSent] = React.useState(false)
  React.useEffect(() => {
    if (eventRequests)
      for (const guests of eventRequests) {
        if (guests.guest.id == guestID) {
          setButtonActive(false)
          setRequestSent(true)
          break
        }
      }
  }, [data, eventRequests, guestID])
  if (!data || !data.eventRequests) {
    return <div>Error?</div>
  }

  if (props.hostID == guestID) {
    return <H3>You're the host of this event!</H3>
  }
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {requestSent ? 'Request sent' : 'Click here to send request'}
    </Tooltip>
  )
  return (
    <OverlayTrigger placement="auto" overlay={renderTooltip}>
      <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
        <Button
          onClick={() => handleClick()}
          disabled={!buttonActive}
          style={{ pointerEvents: buttonActive ? 'all' : 'none' }}
        >
          Send Request
        </Button>
      </div>
    </OverlayTrigger>
  )
}

function EventDetails({ eventId }: { eventId: number }) {
  const { user } = React.useContext(UserContext)
  const LOGGED_IN = Number(user?.id)

  const { loading, data } = useQuery<FetchEventDetails>(fetchEventDetails, { variables: { eventId: eventId } })

  const [eventDetails, setEventDetails] = React.useState(data?.eventDetails)
  React.useEffect(() => {
    if (data?.eventDetails) {
      setEventDetails(data.eventDetails)
    }
  }, [data])
  const [{ showCancelButton, cancelled }, setCancelled] = React.useState({ showCancelButton: false, cancelled: false })
  React.useEffect(() => {
    if (eventDetails) {
      const isHost = Number(eventDetails?.host.id) == LOGGED_IN
      setCancelled({ showCancelButton: isHost, cancelled: false })
    }
  }, [data, eventDetails, LOGGED_IN])
  if (loading) {
    return <div> Loading... </div>
  }
  if (!data || !data.eventDetails || !eventDetails) {
    return <div>No event details available</div>
  }

  function handleSubmit(eventID: number, hostID: number) {
    createRequest(getApolloClient(), {
      eventID: eventID,
      hostID: hostID,
      guestID: LOGGED_IN, //TODO: update this after sign in
    })
      .then(data => {
        console.log('Successful Mutation: ', data)
        toast('Request successfully sent.')
      })
      .catch(err => {
        console.log('handlesubmit ERROR : ', err)
      })
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
    <Card
      style={{
        width: '70rem',
      }}
    >
      <Card.Header>
        <div style={{ textAlign: 'center' }}>
          <H1>{data?.eventDetails?.title}</H1>
          <Spacer $h4 />
          <H3>{data?.eventDetails?.description}</H3>
        </div>
      </Card.Header>
      <Card.Body>
        <Content style={{ margin: 10 }}>
          <RContent>
            <Spacer $h8 />
            <H2>Date</H2>
            <H3>{format(Date.parse(data.eventDetails.startTime), 'MMM do yyyy')}</H3>
            <Spacer $h8 />
            <H2> Location </H2>
            <H3>
              {eventDetails.location.building.name} {eventDetails.location.room}
            </H3>
            <Spacer $h8 />
            <H2> Hosted By </H2>
            <H3>{eventDetails.host.name}</H3>
          </RContent>
          <LContent>
            <Spacer $h8 />
            <H2> Time </H2>
            <H3>
              {format(Date.parse(eventDetails.startTime), 'h:mm b')} -
              {format(Date.parse(eventDetails.endTime), 'h:mm b')}
            </H3>
            <Spacer $h8 />
            <H2> # of People confirmed </H2>
            <H3>
              {eventDetails.guestCount} / {eventDetails.maxGuestCount}{' '}
            </H3>
            <Spacer $h8 />
            <H2>Contact</H2>
            <H3>{eventDetails.host.email}</H3>
            <Spacer $h8 />
            <RequestButton eventID={eventId} hostID={eventDetails.host.id} parentCallback={handleSubmit} />
            <Spacer $h8 />
            {showCancelButton ? <Button onClick={() => handleClick()}>Cancel Event</Button> : null}
            {cancelled ? <H3> Event cancelled </H3> : null}
          </LContent>
        </Content>
      </Card.Body>
    </Card>
  )
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EventDetailsPage(props: EventDetailsPageProps) {
  const eventId = Number(props.eventId)

  if (!eventId) {
    return (
      <Page>
        <div>No event details available</div>
      </Page>
    )
  }

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
