import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { check } from "../../../../common/src/util";
import { Button } from "../../style/button";
import { H2 } from "../../style/header";
import { Input } from "../../style/input";
import { Spacer } from "../../style/spacer";
import { style } from "../../style/styled";
import { Page } from "../page/Page";
import { handleError } from "../toast/error";
import { toastErr } from "../toast/toast";
import { UserContext } from "./user";
export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setError] = useState({ email: false, password: false });
  const { user } = useContext(UserContext);

  // reset error when email/password change
  useEffect(() => setError({ ...err, email: !validateEmail(email) }), [email]);
  useEffect(() => setError({ ...err, password: false }), [password]);

  function login() {
    if (!validate(email, password, setError)) {
      toastErr("invalid email/password");
      return;
    }

    fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        check(res.ok, "response status " + res.status);
        return res.text();
      })
      .then(() => window.location.reload())
      .catch((err) => {
        toastErr(err.toString());
        setError({ email: true, password: true });
      });
  }

  if (user) {
    return <Logout />;
  }

  return (
    <Page>
      <ButtonContainer>
        <H2>Sign Up Today!</H2>
      </ButtonContainer>
      <Content>
        <RContent>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="firstname">
              First Name
            </label>
            <Input
              $onChange={setFirstName}
              $onSubmit={login}
              name="firstname"
              type="firstname"
            />
            {firstName}
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="bio">
              Biography
            </label>
            <Input $onChange={setBio} $onSubmit={login} name="bio" type="bio" />
            {bio}
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="email">
              Email address
            </label>
            <Input
              $hasError={err.email}
              $onChange={setEmail}
              $onSubmit={login}
              name="email"
              type="email"
            />
          </div>
          <div>
            <Spacer $h2/>
            <Form>
              <Form.Group>
                <Form.File
                  id="userImage"
                  label="What do you look like?"
                />
              </Form.Group>
            </Form>
          </div>
        </RContent>
        <LContent>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="lastname">
              Last Name
            </label>
            <Input
              $onChange={setLastName}
              $onSubmit={login}
              name="lastname"
              type="lastname"
            />
            {lastName}
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="phone">
              Phone Number
            </label>
            <Input
              $onChange={setPhone}
              $onSubmit={login}
              name="phone"
              type="phone"
            />
            {phone}
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="password">
              Password
            </label>
            <Input
              $hasError={err.password}
              $onChange={setPassword}
              $onSubmit={login}
              name="password"
              type="password"
            />
          </div>
        </LContent>
      </Content>
      <ButtonContainer>
        <div className="mt3">
          <Button onClick={login}>Sign Up</Button>
        </div>
      </ButtonContainer>
    </Page>
  );
}

function Logout() {
  function logout() {
    return fetch("/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        check(res.ok, "response status " + res.status);
        window.location.reload();
      })
      .catch(handleError);
  }

  return (
    <>
      <Spacer $h5 />
      <Button onClick={logout}>Logout now</Button>
    </>
  );
}

function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validate(
  email: string,
  password: string,
  setError: React.Dispatch<
    React.SetStateAction<{ email: boolean, password: boolean }>
  >
) {
  const validEmail = validateEmail(email);
  const validPassword = Boolean(password);
  console.log("valid", validEmail, validPassword);
  setError({ email: !validEmail, password: !validPassword });
  return validEmail && validPassword;
}

const Content = style("div", "flex-l");

const LContent = style("div", "flex-grow-0 w-60-l mr3-l");

const RContent = style("div", "flex-grow-0  w-60-l mr6-l");

const ButtonContainer = style("div", " w-100 br2 pa3 tc");

