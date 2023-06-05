import React, { useState } from 'react';
import './Login.css'
import Header from '../UI/Header';
import Card from '../UI/Card';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    if (!email || !password) return
    
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
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

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

 
  return (
    <div id='signup-god-container'>
      <Header />
      <Card title='Login'>
        <form id='login-form' onSubmit={handleSubmit}>
          <div id="signup-error-message-container">
            {errorMessage && <p className="signup-error-message">{errorMessage}</p>}
          </div>
          <input placeholder='Enter your email address' id="email" className="form-field" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder='Enter your password' id="password" className="form-field" type='password' value={ password } onChange={handlePasswordChange} />
          <input id='submit' className='signup-submit-btn' type="submit" value="Login" />         
        </form>
          <p className='prompt-login-text'>Don't have an account?  <a href="/signup" className='prompt-login-link'>Signup</a> now</p>
      </Card>
    </div>
    );
}

export default LogInForm;
