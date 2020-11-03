import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { EventDetailsCard } from '../../components/eventDetailsCard'
import { fetchAllActiveEvents } from '../../graphql/fetchEvents'
import { FetchAllActiveEvents } from '../../graphql/query.gen'
import { Spacer } from '../../style/spacer'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
interface HomePageProps extends RouteComponentProps, AppRouteParams {}

function ActiveEventList() {
  const { loading, data } = useQuery<FetchAllActiveEvents>(fetchAllActiveEvents)
  // const [event, setEvent] = React.useState('')

  if (loading) {
    return <div>Loading...</div>
  }
  if (!data || !data.activeEvents || data.activeEvents.length == 0) {
    return <div>No events available. Make one!</div>
  }

  return (
    <div>
      {data.activeEvents.map((e, i) => (
        <div key={i}>
          <EventDetailsCard
            id={e.id}
            title={e.title}
            description={e.description}
            startTime={e.startTime}
            endTime={e.endTime}
            location={e.location.building.name + ' ' + e.location.room}
            numPeople={String(e.guestCount) + '/' + String(e.maxGuestCount)}
            host={e.host.name}
            width="50rem"
          />
          <Spacer $h3 />
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
