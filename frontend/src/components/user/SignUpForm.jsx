import React, { useState } from 'react';
import AWS from 'aws-sdk'

import axios from 'axios';
import './SignUp.css';

import Header from '../UI/Header';
import Card from '../UI/Card';

const SignUpForm = ({ navigate }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    box.append('username', username)
    box.append("email", email);
    box.append("password", password);
    box.append("profilePicture", profilePicture)
    return box
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0])
  }

  return (
    <div id='signup-god-container'>
      <Header />
      <Card title='Signup'>
        <form id='signup-form' onSubmit={handleSubmit}>
          
          <div id="signup-error-message-container">
            {errorMessage && <p className="signup-error-message">{errorMessage}</p>}
          </div>
          <input placeholder="Username" id="username" className="form-field" type="text" value={ username } onChange={handleUsernameChange} />
          <input placeholder="Email" id="email" className="form-field"type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" className="form-field" type='password' value={password} onChange={handlePasswordChange} />

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
