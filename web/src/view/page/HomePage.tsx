import { useQuery } from '@apollo/client'
import { navigate, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { CardDeck, Pagination } from 'react-bootstrap'
import { EventDetailsCard } from '../../components/eventDetailsCard'
import { fetchActiveEventsPage, fetchActiveEventsPages } from '../../graphql/fetchEvents'
import { FetchActiveEventsPage, FetchActiveEventsPages, FetchActiveEventsPageVariables } from '../../graphql/query.gen'
import { Spacer } from '../../style/spacer'
import { AppRouteParams, getHomePath } from '../nav/route'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

function ActiveEventList({ page }: { page: number }) {
  const { loading, data } = useQuery<FetchActiveEventsPage, FetchActiveEventsPageVariables>(fetchActiveEventsPage, {
    variables: { page },
    pollInterval: 10 * 1000,
  })
  // const [event, setEvent] = React.useState('')

  if (loading) {
    return <div>Loading...</div>
  }
  if (!data || !data.activeEventsPage || data.activeEventsPage.length == 0) {
    return <div>No events available. Make one!</div>
  }

  return (
    <div>
      <CardDeck style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {data.activeEventsPage.map((e, i) => (
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
              width="30rem"
            />
            <Spacer $h3 />
          </div>
        ))}
        <br />
      </CardDeck>
    </div>
  )
}
function PaginationPrevBuilder(page: number) {
  const items = []
  if (page > 5) {
    items.push(<Pagination.Ellipsis key={page - 3} />)
    items.push(<Pagination.Item key={page - 2}>{page - 2}</Pagination.Item>)
    items.push(<Pagination.Item key={page - 1}>{page - 1}</Pagination.Item>)
  } else {
    for (let i = 1; i < page; i++) {
      items.push(<Pagination.Item key={i}>{i}</Pagination.Item>)
    }
  }

  return items
}

function PaginationNextBuilder(page: number, maxPage: number) {
  const items = []
  if (page < maxPage - 3) {
    items.push(<Pagination.Item key={page + 1}>{page + 1}</Pagination.Item>)
    items.push(<Pagination.Item key={page + 2}>{page + 2}</Pagination.Item>)
    items.push(<Pagination.Ellipsis key={page + 3} />)
  } else {
    for (let i = page + 1; i < maxPage + 1; i++) {
      items.push(<Pagination.Item key={i}>{i}</Pagination.Item>)
    }
  }
  return items
}

function PaginationBuilder({ page }: { page: number }) {
  const { loading, data } = useQuery<FetchActiveEventsPages>(fetchActiveEventsPages, {
    pollInterval: 10 * 1000,
  })
  if (loading) {
    return <div>Loading...</div>
  }
  if (!data || !data.activeEventsPages) {
    return (
      <Pagination>
        <Pagination.Item>1</Pagination.Item>
      </Pagination>
    )
  }
  const numPages = data.activeEventsPages

  const onClick = function (e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const target = e.target as HTMLElement

    let target_page = page
    // Strip all html tags
    const stripped = target.textContent

    if (!stripped) {
      return
    }

    if (stripped.includes('«')) target_page = 1
    else if (stripped.includes('‹')) target_page = page - 1 < 1 ? 1 : page - 1
    else if (stripped.includes('»')) target_page = numPages
    else if (stripped.includes('›')) target_page = page + 1 > numPages ? numPages : page + 1
    else target_page = Number(stripped)

    void navigate(getHomePath(target_page))
  }

  let items: JSX.Element[] = []
  const prev = PaginationPrevBuilder(page)
  const next = PaginationNextBuilder(page, numPages)
  items = items.concat(prev)
  items.push(
    <Pagination.Item key={page} active>
      {page}
    </Pagination.Item>
  )
  items = items.concat(next)
  return (
    <Pagination onClick={onClick}>
      <Pagination.First />
      <Pagination.Prev />
      {items}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  // const [startTime, setStartTime] = React.useState("");
  // const [endTime, setEndTime] = React.useState("");
  // const [email, setEmail] = React.useState("");
  // const [location, setLocation] = React.useState("");
  // const [numPeople, setNumPeople] = React.useState({numPeople:0});
  const page = Number(props.page)
  if (!page) {
    return (
      <Page>
        <div>No page found</div>
      </Page>
    )
  }
  return (
    <Page>
      <ActiveEventList page={page} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PaginationBuilder page={page} />
      </div>
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
