import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Colors } from '../../../../common/src/colors'
import { fetchUserProfile } from '../../graphql/fetchUserProfile'
import { FetchUserProfile, FetchUserProfileVariables } from '../../graphql/query.gen'
import { H1, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
interface ProfilePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProfilePage(props: ProfilePageProps) {
  const userId = 1
  const { loading, data } = useQuery<FetchUserProfile, FetchUserProfileVariables>(fetchUserProfile, {
    variables: { id: userId },
  })
  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.userProfile) {
    return <div> user does not exist </div>
  }

  return (
    <Page>
      <div>{data.userProfile.email}</div>
      <div>{data.userProfile.name}</div>
      <div>{data.userProfile.bio}</div>
      <div>{data.userProfile.phoneNumber}</div>
      {data.userProfile.hostEvents.map((event, i) => (
        <div key={i}> {(event?.title, event?.description)} </div>
      ))}
      <Hero>
        <H1>This is the profile page</H1>
      </Hero>
      <Content>
        <LContent>
          <Spacer $h4 />

          <BodyText>
            <H3> </H3>
          </BodyText>
        </LContent>
        <RContent>
          <Spacer $h4 />

          <BodyText>
            <H3> </H3>
          </BodyText>
          <Spacer $h4 />
        </RContent>
      </Content>
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
