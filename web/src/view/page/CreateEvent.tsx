/*TO DO:-
<Button onSubmit={POST_to_API}/>
*/
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { create_new_event } from '../../graphql/mutateCreateEvent'
import { Button } from '../../style/button'
import { H1 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { BodyText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
interface CreateEventProps extends RouteComponentProps, AppRouteParams {}

export function CreateEventPage(props: CreateEventProps) {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [startTime, setStartTime] = React.useState('2018-08-12T08:56:37.331336')
  const [endTime, setEndTime] = React.useState('2018-08-12T08:56:37.331336')
  const [attendes, setAttendes] = React.useState('')

  function handleSubmit() {
    create_new_event(getApolloClient(), {
      eventTitle:title,
      eventDesc:description,
      eventStartTime:startTime,
      eventEndTime:endTime,
      maxGuestCount:attendes,
      eventGuestCount:"1"
    })
      .then((data) => {
       console.log("Successful Mutation: ", data)
      })
      .catch(err => {
       // console.log("StartTime Is: ",startTime )
       console.log("handlesubmit ERROR : ",err)
      })
  }


  return (
    <Page>
        <H1>Create Event</H1>
        <Spacer $h6/>
        <BodyText>EVENT TITLE</BodyText>
        <Input $onChange={setTitle} name="title" type="title" /> {title}
        <Spacer $h5/>
        <BodyText>EVENT DESCRIPTION</BodyText>
        <Input $onChange={setDescription} name="description" type="description" /> {description}
        <Spacer $h5/>
        <BodyText>START TIME</BodyText>
        <Input $onChange={setStartTime} name="date" type="string" /> {startTime}
        <Spacer $h5/>
        <BodyText>END TIME</BodyText>
        <Input $onChange={setEndTime} name="date" type="string" /> {endTime}
        <Spacer $h5/>
        <BodyText>WHERE SHOULD WE MEET?</BodyText>
        <Input $onChange={setLocation} name="location" type="location" /> {location}
        <Spacer $h5/>
        <BodyText>ATTENDEES HEADCOUNT REQUESTED</BodyText>
        <Input $onChange={setAttendes} name="attendes" type="attendes" /> {attendes}
        <Spacer $h5/>
        <Button
          onClick={()=>handleSubmit()}
        >CREATE EVENT</Button>
    </Page>
  )
}
