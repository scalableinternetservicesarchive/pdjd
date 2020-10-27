import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Colors } from '../../../../common/src/colors'
import { H1, H2, H4 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
interface ProfilePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProfilePage(props: ProfilePageProps) {
  return (
    <Page>
      <Hero>
        <H1>User Profile </H1>
        <Spacer $h6/>
        <H2>Bio</H2>
        <H4> Bio Here </H4>
        <Spacer $h6/>
        <Content>
          <LContent>
            <H2>Email</H2>
            <H4>email Here</H4>
          </LContent>
          <RContent>
            <H2>Phone</H2>
            <H4>Phone Number here</H4>
          </RContent>
        </Content>
      </Hero>
      <Hero>
        <H2>Events</H2>
      </Hero>
    </Page>
  )
}

const Hero = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderLeftColor: Colors.lemon + '!important',
  borderRightColor: Colors.lemon + '!important',
  borderLeftWidth: '4px',
  borderRightWidth: '4px',
})

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
