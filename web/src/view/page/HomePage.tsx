import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import { format, parseISO } from 'date-fns'
import * as React from 'react'
import Card from 'react-bootstrap/Card'
import { getApolloClient } from '../../graphql/apolloClient'
import { fetchAllActiveEvents, fetchEventRequestsGuests } from '../../graphql/fetchEvents'
import { create_request } from '../../graphql/mutateCreateRequest'
import {
  FetchAllActiveEvents,
  FetchEventRequestsGuests,
  FetchEventRequestsGuestsVariables
} from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H2, H4, H5 } from '../../style/header'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

function RequestButton({ eventID, parentCallback }: { eventID: number; parentCallback: (eventID: number) => void }) {
  const { loading, data } = useQuery<FetchEventRequestsGuests, FetchEventRequestsGuestsVariables>(
    fetchEventRequestsGuests,
    {
      variables: { eventID },
    }
  )

  function handleClick() {
    parentCallback(eventID)
    setbuttonActive(false)
  }

  const guestID = 1
  let activeCheck = true
  if (loading) {
    return <div>Loading...</div>
  }

  if (!data || !data.eventRequests) {
    return <div>Error?</div>
  } else {
    for (const guests of data.eventRequests) {
      if (guests.guest.id == guestID) {
        activeCheck = false
        break
      }
    }
  }

  const [buttonActive, setbuttonActive] = React.useState(activeCheck)

  if (buttonActive) {
    return <Button onClick={handleClick} />
  } else {
    return <div>Request sent!</div> //TODO: cancel request
  }
}

function ActiveEventList() {
  const { loading, data } = useQuery<FetchAllActiveEvents>(fetchAllActiveEvents)

  // const [event, setEvent] = React.useState('')

  if (loading) {
    return <div>Loading...</div>
  }
  if (!data || !data.activeEvents) {
    return <div>No events available. Make one!</div>
  }

  const handleSubmit = function (eventID: number) {
    create_request(getApolloClient(), {
      eventID: eventID,
      guestID: 1, //TODO: update this after sign in
    })
      .then(data => {
        console.log('Successful Mutation: ', data)
      })
      .catch(err => {
        console.log('handlesubmit ERROR : ', err)
      })
  }

  return (
    <div>
      {data.activeEvents.map((e, i) => (
        <div key={i}>
          <Card style={{ width: '50rem', backgroundColor: '#F2D9D9' }}>
            <H2>{e.title}</H2>
            <H4>{e.description}</H4>
            <Content>
              <RContent>
                <H5>Date: {format(parseISO(e.startTime), 'MMM do yyyy')}</H5>
                <H5>
                  Time: {format(parseISO(e.startTime), 'h:mm b')} - {format(parseISO(e.endTime), 'h:mm b')}
                </H5>
                <H5>
                  Location: {e.location.building.name} {e.location.room}
                </H5>
              </RContent>
              <LContent>
                <H5>
                  # of People: {e.guestCount}/{e.maxGuestCount} confirmed
                </H5>
                <H5>Contact: {e.host.name}</H5>
                <RequestButton eventID={e.id} parentCallback={handleSubmit} />
              </LContent>
            </Content>
          </Card>
        </div>
      ))}
      <br />
    </div>
  )
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  // const [startTime, setStartTime] = React.useState("");
  // const [endTime, setEndTime] = React.useState("");
  // const [email, setEmail] = React.useState("");
  // const [location, setLocation] = React.useState("");
  // const [numPeople, setNumPeople] = React.useState({numPeople:0});

  return (
    <Page>
      <ActiveEventList />
    </Page>
  )
}

// const Hero = style("div", "mb4 w-100 ba b--mid-gray br2 pa3 tc", {
//   borderLeftColor: Colors.lemon + "!important",
//   borderRightColor: Colors.lemon + "!important",
//   borderLeftWidth: "4px",
//   borderRightWidth: "4px",
// });

const Content = style('div', 'flex-l')

const LContent = style('div', 'flex-grow-0 w-60-l mr4-l')

const RContent = style('div', 'flex-grow-0  w-60-l')

// const Section = style(
//   "div",
//   "mb4 mid-gray ba b--mid-gray br2 pa3",
//   (p: { $color?: ColorName }) => ({
//     borderLeftColor: Colors[p.$color || "lemon"] + "!important",
//     borderLeftWidth: "3px",
//   })
// );

// const TD = style('td', 'pa1', p => ({
//   color: p.$theme.textColor(),
// }))
