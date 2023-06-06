import { useState, useRef } from 'react';
import './Login.css'
import Header from '../UI/Header';
import Card from '../UI/Card';
import InputForm from '../UI/InputForm';
import ErrorMessage from '../UI/ErrorMessage';

const LogInForm = ({ navigate }) => {
  const email = useRef()
  const password = useRef()
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    if (!email || !password) return
    
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value
      })
    })

    if (response.status === 401) {
        setErrorMessage('Email address is incorrect. Try again!');
    } else if (response.status === 402) {
        setErrorMessage('Password is incorrect. Try again!');
    } else {
        let data = await response.json()
        window.localStorage.setItem("token", data.token)
        navigate('/posts');
    }
  }

  return (
    <div id='signup-god-container'>
      <Header />
      <Card title='Login'>
        <form id='login-form' onSubmit={handleSubmit}>
          <ErrorMessage message={errorMessage} />
          <InputForm ref={email} input={{placeholder: 'Enter your email address', id: 'email', type: 'text'}} />
          <InputForm ref={password} input={{placeholder: 'Enter your password', id: 'password', type: 'password'}} />
          <input id='submit' className='signup-submit-btn' type="submit" value="Login" />         
        </form>
          <p className='prompt-login-text'>Don't have an account?  <a href="/signup" className='prompt-login-link'>Signup</a> now</p>
      </Card>
    </div>
    );
}

export default LogInForm;
