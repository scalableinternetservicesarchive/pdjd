import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from "react-bootstrap/Card";
import ToggleButton from 'react-bootstrap/ToggleButton';
import { H2, H4, H5 } from "../../style/header";
import { style } from '../../style/styled';
import { AppRouteParams } from "../nav/route";
import { Page } from "./Page";
interface HomePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  // const [startTime, setStartTime] = React.useState("");
  // const [endTime, setEndTime] = React.useState("");
  // const [email, setEmail] = React.useState("");
  // const [location, setLocation] = React.useState("");
  // const [numPeople, setNumPeople] = React.useState({numPeople:0});
  const [attendance, setAttendance] = React.useState('1');

  const attendanceStatus = [
    { name: 'Going', value: '1' },
    { name: 'Not Going', value: '2' },
  ];

  return (
    <Page>
      <Card style={{ width: "50rem", backgroundColor:"#F2D9D9" }}>
        <H2>Pick Up Soccer</H2>
        <H4>Hey everyone! I’m organizing an 11v11 pick-up soccer
          game next week. All levels welcome!</H4>
            <Content>
              <RContent>
                 <H5>Date: 10/19/2020</H5>
                 <H5>Time: 6:30 - 5:30</H5>
                 <H5>Location: UCLA UM FIELD</H5>
              </RContent>
              <LContent>
              <H5># of People: 12/24 confirmed</H5>
              <H5>Contact: joebruin@ucla.com</H5>
              <ButtonGroup toggle>
        {attendanceStatus.map((status, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="secondary"
            name="radio"
            value={status.value}
            checked={attendance === status.value}
            onChange={(e) => setAttendance(e.currentTarget.value)}
          >
            {status.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
              </LContent>
        </Content>

      </Card>
      <br />
    </Page>
  );
}

// const Hero = style("div", "mb4 w-100 ba b--mid-gray br2 pa3 tc", {
//   borderLeftColor: Colors.lemon + "!important",
//   borderRightColor: Colors.lemon + "!important",
//   borderLeftWidth: "4px",
//   borderRightWidth: "4px",
// });

const Content = style("div", "flex-l");

const LContent = style("div", "flex-grow-0 w-60-l mr4-l");

const RContent = style("div", "flex-grow-0  w-60-l");

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

