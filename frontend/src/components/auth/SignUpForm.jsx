import Page from '../Layout/Page';
import Header from '../UI/Header';
import Card from '../UI/Card';
import InputForm from '../Form/InputForm';
import ErrorMessage from '../Form/ErrorMessage';
import SubmitButton from '../Form/SubmitButton';
import Prompt from '../Form/Prompt';

import { useState, useRef } from 'react';
import axios from 'axios';
import './SignUp.css';

const SignUpForm = ({ navigate }) => {
  const username = useRef()
  const email = useRef()
  const password = useRef()

  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0])
  }

  const handleSubmit = async (event) => {    
    event.preventDefault();
    
    const formData = newFormData();
    axios.post('/users', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        if (response.status === 201) { navigate('/login') }
        else { navigate('/signup') }
      })
      .catch((err) => setErrorMessage(err.response.data.message));
  }

  const newFormData = () => {
    const formData = new FormData()
    formData.append('username', username.current.value)
    formData.append("email", email.current.value);
    formData.append("password", password.current.value);
    formData.append("profilePicture", profilePicture)
    return formData
  }

  return (
    <Page>
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
          
          <SubmitButton value='Sign up'/>
        </form>
        <Prompt message='Already have an account? Please ' href='/login' link='Login'/>
      </Card>
    </Page>
  );
}

export default SignUpForm;
