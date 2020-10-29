/*TO DO:-
<Button onSubmit={POST_to_API}/>
*/
import { useQuery } from '@apollo/client'
import { navigate, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { fetchBuildings, fetchLocation } from '../../graphql/fetchLocations'
import { createEvent } from '../../graphql/mutateEvents'
import { FetchBuildings, FetchLocation, FetchLocationVariables } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H1 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { BodyText } from '../../style/text'
import { AppRouteParams, getPath, Route } from '../nav/route'
import { Page } from './Page'
interface CreateEventProps extends RouteComponentProps, AppRouteParams {}

function LocationList({
  buildingID,
  parentCallback,
}: {
  buildingID: number
  parentCallback: (locationID: string) => void
}) {
  const [location, setLocation] = React.useState('1')

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const locationID = event.target.value
    setLocation(locationID)
    parentCallback(locationID)
  }

  const { loading, data } = useQuery<FetchLocation, FetchLocationVariables>(fetchLocation, {
    variables: { buildingID },
  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <select value={location} onChange={handleChange}>
      {' '}
      {data?.building?.locations.map((l, i) => (
        <option value={String(l?.id)} key={i}>
          {l?.room}
        </option>
      ))}
    </select>
  )
}

export function CreateEventPage(props: CreateEventProps) {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [location, setLocation] = React.useState('1')
  const [startTime, setStartTime] = React.useState('')
  const [endTime, setEndTime] = React.useState('')
  const [guest, setGuest] = React.useState('')
  const [building, setBuilding] = React.useState('1')

  const { loading, data } = useQuery<FetchBuildings>(fetchBuildings)

  if (loading) {
    return <div>Loading...</div>
  }

  function handleSubmit() {
    createEvent(getApolloClient(), {
      eventTitle: title,
      eventDesc: description,
      eventStartTime: startTime,
      eventEndTime: endTime,
      maxGuestCount: guest,
      eventGuestCount: '1',
      eventLocationID: Number(location),
      eventHostID: 1,
    })
      .then(data => {
        console.log('Successful Mutation: ', data)
        alert('Event Created Successfully')
        navigate(getPath(Route.HOME))
      })
      .catch(err => {
        // console.log("StartTime Is: ",startTime )
        console.log('handlesubmit ERROR : ', err)
        alert(err)
      })
  }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setBuilding(event.target.value)
  }

  const parentCallback = function (locationID: string) {
    setLocation(locationID)
  }

  return (
    <Page>
      <H1>Create Event</H1>
      <Spacer $h6 />
      <BodyText>EVENT TITLE</BodyText>
      <Input $onChange={setTitle} name="title" type="title" />
      <Spacer $h5 />
      <BodyText>EVENT DESCRIPTION</BodyText>
      <Input $onChange={setDescription} name="description" type="description" />
      <Spacer $h5 />
      <BodyText>START TIME</BodyText>
      <Input $onChange={setStartTime} name="time" type="datetime-local" />
      <Spacer $h5 />
      <BodyText>END TIME</BodyText>
      <Input $onChange={setEndTime} name="time" type="datetime-local" />
      <Spacer $h5 />
      <BodyText>Building Name</BodyText>
      <select value={building} onChange={handleChange}>
        {' '}
        {data?.buildings.map((b, i) => (
          <option value={b?.id} key={i}>
            {b?.name}
          </option>
        ))}
      </select>
      <Spacer $h5 />
      <BodyText>Room Name</BodyText>
      <LocationList parentCallback={parentCallback} buildingID={Number(building)} />
      <Spacer $h5 />
      <BodyText>MAXINUM NUMBER OF GUESTS</BodyText>
      <Input $onChange={setGuest} name="guest" type="guest" />
      <Spacer $h5 />
      <Button onClick={() => handleSubmit()}>CREATE EVENT</Button>
    </Page>
  )
}
