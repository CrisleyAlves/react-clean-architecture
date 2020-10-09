import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { Footer, LoginHeader, FormStatus, Input } from '@/presentation/components/'

import FormContext from '@/presentation/context/form/form-context'

const Login: React.FC = () => {
  const [state] = useState({ isLoading: false })

  const [errorState] = useState({
    email: 'Required field',
    password: 'Required field',
    main: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Enter your email"/>
          <Input type="password" name="password" placeholder="Enter your password"/>

          <button data-testid="submit" disabled className={Styles.submit} type="submit">Enter</button>
          <span className={Styles.link}>create account</span>

          <FormStatus />

        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
