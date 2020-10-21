import * as React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '../style/button'
import { Input } from '../style/input'
// import { UserContext } from './user'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setError] = useState({ email: false, password: false })
  // const { user } = useContext(UserContext)

  // reset error when email/password change
  React.useEffect(() => setError({ ...err, email: false }), [email])
  useEffect(() => setError({ ...err, password: false }), [password])

  return (
    <>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="email">
          Email add
        </label>
        <Input $hasError={err.email} $onChange={setEmail} $onSubmit={} name="email" type="email" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="password">
          Password
        </label>
        <Input $hasError={err.password} $onChange={setPassword} $onSubmit={} name="password" type="password" />
      </div>
      <div className="mt3">
        <Button onClick={}>Sign Up</Button>
      </div>
    </>
  )
}
