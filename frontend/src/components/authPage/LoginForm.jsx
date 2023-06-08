import Page from '../Layout/Page';
import Header from './Header';
import Card from '../UI/Card';
import Input from '../UI/Input';
import ErrorMessage from './ErrorMessage';
import SubmitButton from '../UI/SubmitButton';
import Prompt from './Prompt';

import { useState, useRef } from 'react';
import style from './Login.module.css'

const LogInForm = ({ navigate }) => {
  const email = useRef()
  const password = useRef()
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value
      })
    })

    let data = await response.json()
    if (response.status !== 201) { setErrorMessage(data.message) }
    else {
      window.localStorage.setItem("token", data.token)
      navigate('/posts');
    }
  }

  return (
    <Page>
      <Header />
      <Card title='Login'>
        <form className={style['login-form']} onSubmit={handleSubmit}>
          <h1>Login</h1>
          <ErrorMessage message={errorMessage} />
          <Input ref={email} style='form' input={{placeholder: 'Enter your email address', id: 'email', type: 'text'}} />
          <Input ref={password} style='form' input={{ placeholder: 'Enter your password', id: 'password', type: 'password'} } />
          <SubmitButton style='submit-form' value='Login'/>
        </form>
        <Prompt message="Don't have an account? please " href='/signup' link='Signup' />
      </Card>
    </Page>
    );
}

export default LogInForm;
