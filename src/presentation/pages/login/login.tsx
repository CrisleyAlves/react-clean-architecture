import React from 'react';
import Styles from './login-styles.scss';
import Spinner from '@/presentation/components/spinner/spinner';
import LoginHeader from '@/presentation/components/login-header/login-header';
import Input from '@/presentation/components/input/input';
import FormStatus from '@/presentation/components/form-status/form-status';
import Footer from '@/presentation/components/footer/footer';

const Login: React.FC = () => {

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        
        <Input type="email" name="email" placeholder="Enter your email"/>
        <Input type="password" name="password" placeholder="Enter your password"/>
        
        <button className={Styles.submit} type="submit">Enter</button>
        <span className={Styles.link}>create account</span>

        <FormStatus />

      </form>
      <Footer />
    </div>
  )

}

export default Login;