import { navigate } from '@reach/router'
import { format, parseISO } from 'date-fns'
import * as React from 'react'
import { Card } from 'react-bootstrap'
import { H2, H3, H5 } from '../style/header'
import { style } from '../style/styled'
import { getEventPath } from '../view/nav/route'
const Content = style('div', 'flex-l')

const LContent = style('div', 'flex-grow-0 w-60-l mr4-l')

const RContent = style('div', 'flex-grow-0  w-60-l')

export function EventDetailsCard(props: {
  id: number
  title: string
  description: string
  location: string
  startTime: string
  endTime: string
  numPeople: string
  host: string
}) {
  function onClick() {
    void navigate(getEventPath(props.id))
  }
  return (
    <Card as="a" onClick={() => onClick()} bg="light">
      <Card.Header>
        <div style={{ textAlign: 'center' }}>
          <H2>{props.title}</H2>
          <H3>{props.description}</H3>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <Content>
            <RContent>
              <H5>Date: {format(parseISO(props.startTime), 'MMM do yyyy')}</H5>
              <H5>
                Time: {format(parseISO(props.startTime), 'h:mm b')} - {format(parseISO(props.endTime), 'h:mm b')}
              </H5>
              <H5>Location: {props.location}</H5>
            </RContent>
            <LContent>
              <H5># of People: {props.numPeople} confirmed</H5>
              <H5>Contact: {props.host}</H5>
            </LContent>
          </Content>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
