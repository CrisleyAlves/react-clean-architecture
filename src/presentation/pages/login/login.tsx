import React from 'react';
import Styles from './login-styles.scss';
import Spinner from '@/presentation/components/spinner/spinner';

const Login: React.FC = () => {

  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <img src="" />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrapper}>
          <input type="email" name="email" placeholder="Enter your email" />
          <span className={Styles.status}>k</span>
        </div>
        <div className={Styles.inputWrapper}>
          <input type="password" name="password" placeholder="Enter your password" />
          <span className={Styles.status}>k</span>
        </div>
        
        <button className={Styles.submit} type="submit">Enter</button>
        <span className={Styles.link}>create account</span>

        <div className={Styles.errorWrapper}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>

      </form>
      <footer className={Styles.footer}></footer>
    </div>
  )

}

export default Login;