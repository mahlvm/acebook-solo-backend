import React, { useState, useRef } from 'react';

import axios from 'axios';
import './SignUp.css';

import Header from '../UI/Header';
import Card from '../UI/Card';
import InputForm from '../UI/InputForm';
import ErrorMessage from '../UI/ErrorMessage';

const SignUpForm = ({ navigate }) => {
  const username = useRef()
  const email = useRef()
  const password = useRef()

  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    if (!email || !password || !username) return
    
    event.preventDefault();
    
    const theBox = makingTheBox();
    axios.post('/users', theBox, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        if (response.status === 201) { navigate('/login') }
        else { navigate('/signup') }
      })
      .catch((err) => setErrorMessage(err.response.data.message));
  }

  const makingTheBox = () => {
    const box = new FormData()
    box.append('username', username.current.value)
    box.append("email", email.current.value);
    box.append("password", password.current.value);
    box.append("profilePicture", profilePicture)
    return box
  }

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0])
  }

  return (
    <div id='signup-god-container'>
      <Header />
      <Card title='Signup'>
        <form id='signup-form' onSubmit={handleSubmit}>
          <ErrorMessage message={errorMessage} />
          <InputForm ref={username} input={{ placeholder: 'Username', id: 'username', type: 'text' }} />
          <InputForm ref={email} input={{placeholder: 'Email', id: 'email', type: 'text'}} />
          <InputForm ref={password} input={{placeholder: 'Password', id: 'password', type: 'password'}} />

          <p id='upload-photo-text'>Upload a profile picture</p>
          <div id="signup-profile-pic-upload-container">
            <div id="signup-profile-pic-upload-icon">
              <input id="profilePicture" className="form-field" type="file" accept=".png, .jpg, .jpeg" onChange={handleProfilePictureChange} />
              <i className="fa-regular fa-image fa-3x"></i>
            </div>
            <div>
              {<p className='signup-photo-filename'>{profilePicture ? profilePicture.name : "No file chosen"}</p> }
            </div>
          </div>
          
          <input id='submit' className='signup-submit-btn' type="submit" value="Sign up" />
          
        </form>
          <p className='prompt-login-text'>Already have an account? Please <a href="/login" className='prompt-login-link'>login</a></p>
      </Card>
    </div>
    );
}

export default SignUpForm;
