import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Footer, LoginHeader, FormStatus, Input } from '@/manguinho/presentation/components'
import { Validation } from '@/manguinho/presentation/protocols/validation'

import FormContext from '@/manguinho/presentation/context/form/form-context'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: state.email && validation.validate('email', state.email),
      passwordError: state.password && validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Enter your email"/>
          <Input type="password" name="password" placeholder="Enter your password"/>

          <button data-testid="submit" disabled={!!state.passwordError && !!state.emailError} className={Styles.submit} type="submit">Enter</button>
          <span className={Styles.link}>create account</span>

          <FormStatus />

        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
