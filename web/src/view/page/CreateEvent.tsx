import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { ColorName, Colors } from '../../../../common/src/colors'
import { H1, H2, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
interface CreateEventProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CreateEventPage(props: CreateEventProps) {
  return (
    <Page>
        <H1>Create Event</H1>
      <Content>
        <LContent>
          <Section>
            <H2>From </H2>
            <Spacer $h4 />

            <BodyText>
             <H3> </H3>
            </BodyText>
          </Section>

        </LContent>
        <RContent>
        <Section>
            <H2>From </H2>
            <Spacer $h4 />

            <BodyText>
              <H3> </H3>
            </BodyText>
            <Spacer $h4 />
          </Section>

        </RContent>
      </Content>
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

const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
  borderLeftColor: Colors[p.$color || 'lemon'] + '!important',
  borderLeftWidth: '3px',
}))

// const TD = style('td', 'pa1', p => ({
//   color: p.$theme.textColor(),
// }))
