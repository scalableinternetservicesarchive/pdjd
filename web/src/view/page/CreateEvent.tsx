/*TO DO:-
<Button onSubmit={POST_to_API}/>
*/
import { gql, useMutation } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Button } from '../../style/button'
import { H1 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { BodyText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
interface CreateEventProps extends RouteComponentProps, AppRouteParams {}
const CREATE_EVENT = gql`mutation createNewEvent (
  $eventTitle:String!
  $eventDesc:String!,
  $eventStartTime:Date!,
  $eventEndTime:Date!,
  $maxGuestCount:Int!,
  $eventStatus:eventStatus!,
  $eventGuesCount:Int!
){
    createEvent(event_input: {
      eventTitle:$eventTitle
      eventDesc:$eventDesc,
      eventEndTime:$eventEndTime,
      eventStartTime:$eventStartTime,
      eventMaxGuestCount:$maxGuestCount,
      eventStatus:$eventStatus,
      eventGuestCount:$eventGuesCount
    })
      {
       id,
        title

     }
}`
interface eventTypes {
  eventTitle:string
  eventDesc:string,
  eventStartTime:Date,
  eventEndTime:Date,
  maxGuestCount:number,
  eventStatus:string,
  eventGuesCount:number
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CreateEventPage(props: CreateEventProps) {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [date, setDate] = React.useState('')
  const [startTime, setStartTime] = React.useState('')
  const [endTime, setEndTime] = React.useState('')
  const [attendes, setAttendes] = React.useState('')
  const [create_event, {error,data}]=useMutation<{create_event:eventTypes}>(CREATE_EVENT,{variables:{
    eventTitle:title,eventDesc:description,eventStartTime:startTime,eventEndTime:endTime,
    eventStatus:"OPEN",eventGuesCount:12,eventMaxGuestCount:attendes}
  })
  return (
    <Page>
        <H1>Create Event</H1>
        {error ? <p>Oh no! {error.message}</p> : null}
        {data  ? <p>Savedfffffffffffffff !</p> : null}
        <Spacer $h6/>
        <BodyText>EVENT TITLE</BodyText>
        <Input $onChange={setTitle} name="title" type="title" /> {title}
        <Spacer $h5/>
        <BodyText>EVENT DESCRIPTION</BodyText>
        <Input $onChange={setDescription} name="description" type="description" /> {description}
        <Spacer $h5/>
        <BodyText>EVENT DATE</BodyText>
        <Input $onChange={setDate} name="date" type="date" /> {date}
        <Spacer $h5/>
        <BodyText>START TIME</BodyText>
        <Input $onChange={setStartTime} name="time" type="time" /> {startTime}
        <Spacer $h5/>
        <BodyText>END TIME</BodyText>
        <Input $onChange={setEndTime} name="time" type="time" /> {endTime}
        <Spacer $h5/>
        <BodyText>WHERE SHOULD WE MEET?</BodyText>
        <Input $onChange={setLocation} name="location" type="location" /> {location}
        <Spacer $h5/>
        <BodyText>ATTENDES HEADCOUNT REQUESTED</BodyText>
        <Input $onChange={setAttendes} name="attendes" type="attendes" /> {attendes}

        <Spacer $h5/>
        <Button
          onClick={()=>create_event()}
        >CREATE EVENT</Button>
    </Page>
  )
}
