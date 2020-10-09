import React from 'react';
import Styles from './login-styles.scss';
import Spinner from '@/presentation/components/spinner/spinner';
import LoginHeader from '@/presentation/components/login-header/login-header';
import Footer from '@/presentation/components/footer/footer';

const Login: React.FC = () => {

  return (
    <div className={Styles.login}>
      <LoginHeader />
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
      <Footer />
    </div>
  )

}

export default Login;