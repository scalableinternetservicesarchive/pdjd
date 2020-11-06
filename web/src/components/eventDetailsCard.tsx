import { navigate } from '@reach/router'
import { format, parseISO } from 'date-fns'
import * as React from 'react'
import { Card } from 'react-bootstrap'
import { Button } from '../style/button'
import { H2, H3, H5 } from '../style/header'
import { style } from '../style/styled'
import { getEventPath } from '../view/nav/route'
const Content = style('div', 'flex-l')

const LContent = style('div', 'flex-grow-0 w-60-l mr4-l')

const RContent = style('div', 'flex-grow-0  w-60-l')

const H5Bold = style('h5', 'b', { fontSize: '16px' })
export function EventDetailsCard(props: {
  id: number
  title: string
  description: string
  location: string
  startTime: string
  endTime: string
  numPeople: string
  host: string
  width: string
  requestStatus?: string
  requestGuestName?: string
  acceptHandler?: (e: any) => void
  rejectHandler?: (e: any) => void
}) {
  function onClick() {
    void navigate(getEventPath(props.id))
  }
  return (
    <Card as="a" onClick={() => onClick()} bg="light" style={{ width: props.width }}>
      <Card.Header>
        <div style={{ textAlign: 'center' }}>
          <H2>{props.title}</H2>
          <H3>{props.description}</H3>
        </div>
      </Card.Header>
      <Card.Body>
        <Content>
          <RContent>
            <H5Bold>Date</H5Bold>
            <H5>{format(parseISO(props.startTime), 'MMM do yyyy')}</H5>
            <H5Bold>Time</H5Bold>
            <H5>
              {format(parseISO(props.startTime), 'h:mm b')} - {format(parseISO(props.endTime), 'h:mm b')}
            </H5>
            <H5Bold>Location</H5Bold>
            <H5>{props.location}</H5>
          </RContent>
          <LContent>
            <H5Bold>Number of people</H5Bold>
            <H5>{props.numPeople} confirmed</H5>
            <H5Bold>Contact</H5Bold>
            <H5>{props.host}</H5>
            {props.requestStatus && <H5Bold>Request Status</H5Bold>}
            {props.requestStatus && <H5>{props.requestStatus}</H5>}
            {props.requestGuestName && <H5Bold>{props.requestGuestName} Wants To Join</H5Bold>}
            {props.requestGuestName && (
              <H5>
                {' '}
                <Button onClick={props.acceptHandler}>Accept</Button>{' '}
                <Button onClick={props.rejectHandler}>Reject</Button>{' '}
              </H5>
            )}
          </LContent>
        </Content>
      </Card.Body>
    </Card>
  )
}
