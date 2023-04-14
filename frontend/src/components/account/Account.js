import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import './Account.css';
import Navbar from '../feed/navbar/Navbar';
import {EmailForm, UsernameForm, PasswordForm, AvatarForm} from './forms/forms.js';

const AccountPage = ({ navigate }) => {
  
  const { state } = useLocation();
  const userData = state.userData;
  const token = state.token;

  const [email, setEmail] = useState(false);
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const deleteAccount = () => {
    if(token) {
      fetch(`/users?id=${userData._id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        method: "DELETE"
      })
        .then(response => response.json())
        .then(data => {
          window.localStorage.removeItem("token")
          navigate('/login')
        })
        .catch(error => console.log(error));
    }
  }

    const updateUser = (field, value) => {
      const body = { id: userData._id };
      body[field] = value
      fetch('/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(() => {
        navigate('/posts')
      })
      .catch(error => console.log(error));
}

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const postPage = () => {
    navigate('/posts')
  }

  if(token) {
    return(
      <>
      <Navbar currentPage="account" logout={logout} post={postPage}/>
      <div className="account-page">
        
        <h1>Account Information</h1> <br></br>
          <h2>Email</h2>
          {userData.email}
          {email === true && <EmailForm updateUser={updateUser}/>}
        <br></br>
        <br></br> 
            <h2>Username</h2>
            {userData.username}
            {username === true && <UsernameForm updateUser={updateUser}/>}
        <br></br>
        <br></br>
            <h2>Password</h2>
            ********
            {password === true && <PasswordForm/>}
        <br></br>
        <br></br>
            <h2>Avatar</h2>
            <img src={ userData.avatar } alt="Avatar" width="200" height="200"></img>
            {avatar === true && <AvatarForm profilePicture={profilePicture}/>}
        <br></br>
        <br></br>   


        <div>
          <button className="account-btn" onClick={() => setEmail(!email)}>Change Email</button>
          <button className="account-btn" onClick={() => setUsername(!username)}>Change Username</button>
          <button className="account-btn" onClick={() => setPassword(!password)}>Change Password</button>
          <button className="account-btn" onClick={() => setAvatar(!avatar)}>Change Avatar</button>
        </div>

        <br></br>
        <br></br>
        <div>
          <button className="delete-btn" onClick={deleteAccount}>Delete Account</button>
        </div>
      </div>
      </>
      

    )
  }

  
}

export default AccountPage;