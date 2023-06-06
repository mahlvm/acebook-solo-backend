import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import './Account.css';
import Navbar from '../feed/navbar/Navbar';
import { EmailForm, UsernameForm, PasswordForm } from './forms/forms.js';
import AvatarForm from './forms/AvatarForm'

import Card from '../UI/Card';
import Page from '../Layout/Page';

const AccountPage = ({ navigate }) => {
  
  const { state } = useLocation();
  const userData = state.userData;
  const token = state.token;

  const [optionSelected, setOptionSeclected] = useState("Main")

  const deleteAccount = () => {
    if(token) {
      fetch(`/comments?id=${userData._id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        method: "DELETE"
      })
      .then(() => {
        fetch(`/posts?id=${userData._id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
          method: "DELETE"
        })})
      .then(() => {
        fetch(`/users?id=${userData._id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
          method: "DELETE"
        })})
      .then(() => {
        window.localStorage.removeItem("token")
        navigate('/login')
        })
      .catch(error => console.log(error));
    }}

  const updateUser = (field, value) => {
    const body = { id: userData._id };
    body[field] = value

    fetch('/users', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(() => navigate('/posts'))
    .catch(error => console.log(error));
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const post = () => navigate('/posts')

  if(token) {
    return(
      <Page>

        <div id='god-container'>
          <div id='navbar-container'>
            <nav id="navbar">
              <h1>ACEBOOK</h1>
              <div id="navbar-btns">
                <button className="navbar-btn" onClick={post}>Home</button>
                <button className="navbar-btn">Photos</button>
                <button className="navbar-btn" onClick={logout}>Logout</button>
              </div>
            </nav>
          </div>

          <Card title='My account'>

            <div id="account-page-form">
              <div id='account-page-menu'>
                <div id="account-page-img-container">
                  <img src={ userData.avatar } alt="Avatar"></img>
                </div>
                <button className="account-page-btn" onClick={() => setOptionSeclected("Avatar")}>Change Avatar</button>
                <button className="account-page-btn" onClick={() => setOptionSeclected("Email")}>Change Email</button>
                <button className="account-page-btn" onClick={() => setOptionSeclected("Username")}>Change Username</button>
                <button className="account-page-btn" onClick={() => setOptionSeclected("Password")}>Change Password</button>
                <button className="account-page-btn delete-account-btn" onClick={() => setOptionSeclected("Delete")}>Delete Account</button>
              </div>
              <div id='account-page-menu-interaction'>

                <div id='account-page-menu-main' className={optionSelected === "Main" ? "show-menu" : "hide-menu"}>
                  <h2 className="menu-title">My information</h2>
                  <div>
                    <p className="info-details-title">My current email:</p>
                    <p className="info-details-value">{userData.email}</p>
                  </div>
                  <div>
                    <p className="info-details-title">My current username:</p>
                    <p className="info-details-value">{userData.username}</p>
                  </div>
                  <div>
                    <p className="info-details-title">My current password:</p>
                    <p className="info-details-value">********</p>
                  </div>
                </div>
                <div id='account-page-menu-avatar' className={optionSelected === "Avatar" ? "show-menu" : "hide-menu"}>
                  <h2 className="menu-title">Profile picture</h2>
                  <div>
                    <p className="info-details-title">Select a new picture:</p>
                    <p></p>
                  </div>
                  <AvatarForm userData={userData} navigate={navigate} updateUser={updateUser} token={token} />
                </div>

                <div id='account-page-menu-email' className={optionSelected === "Email" ? "show-menu" : "hide-menu"}>
                  <h2 className="menu-title">Email</h2>
                  <div>
                    <p className="info-details-title">My current email:</p>
                    <p className="info-details-value">{userData.email}</p>
                  </div>
                  <EmailForm updateUser={updateUser} />
                </div>
                
                <div id='account-page-menu-username' className={optionSelected === "Username" ? "show-menu" : "hide-menu"}>
                  <h2 className="menu-title">Username</h2>
                  <div>
                    <p className="info-details-title">My current username:</p>
                    <p className="info-details-value">{userData.username}</p>
                  </div>
                  <UsernameForm updateUser={updateUser} />
                </div>

                <div id='account-page-menu-password' className={optionSelected === "Password" ? "show-menu" : "hide-menu"}>
                  <h2 className="menu-title">Password</h2>
                  <div>
                    <p className="info-details-title">My current password:</p>
                    <p className="info-details-value">********</p>
                  </div>
                  <PasswordForm />
                </div>
                <div id='account-page-menu-delete' className={optionSelected === "Delete" ? "show-menu" : "hide-menu"}>
                  <h2 className="menu-title">Are you sure?</h2>
                  <button type="submit" className="my-account-btn red-btn" onClick={deleteAccount}>Delete</button>
                </div>
              </div>
            </div>
            <p className='prompt-login-text'><a href="/posts" className='prompt-login-link'>Back</a></p>

          </Card>
        </div>
      </Page>
    )
  }
}

export default AccountPage;