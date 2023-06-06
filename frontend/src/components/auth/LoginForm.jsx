import Header from '../UI/Header';
import Card from '../UI/Card';
import InputForm from '../Form/InputForm';
import ErrorMessage from '../Form/ErrorMessage';
import SubmitButton from '../Form/SubmitButton';
import Prompt from '../Form/Prompt';

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
    <div id='signup-god-container'>
      <Header />
      <Card title='Login'>
        <form className={style['login-form']} onSubmit={handleSubmit}>
          <ErrorMessage message={errorMessage} />
          <InputForm ref={email} input={{placeholder: 'Enter your email address', id: 'email', type: 'text'}} />
          <InputForm ref={password} input={{ placeholder: 'Enter your password', id: 'password', type: 'password' }} />
          <SubmitButton value='Login'/>
        </form>
        <Prompt message="Don't have an account? please " href='/signup' link='Signup' />
      </Card>
    </div>
    );
}

export default LogInForm;
