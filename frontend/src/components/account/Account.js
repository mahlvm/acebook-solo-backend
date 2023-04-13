import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import './Account.css';
import Navbar from '../feed/navbar/Navbar';

const AccountPage = ({ navigate }) => {
  
  const { state } = useLocation();
  const userData = state.userData;
  const token = state.token;


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
        <h1>Account Information</h1> <br></br>
          <h2>Email</h2>
          {userData.email}
        
        <br></br>
        <br></br> 
            <h2>Username</h2>
            {userData.username}


        <br></br>
        <br></br>

        <div>
          <button className="account-btn">Change Email</button>
          <button className="account-btn">Change Username</button>
          <button className="account-btn">Change Password</button>
          <button className="account-btn">Change Avatar</button>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <button className="delete-btn" onClick={deleteAccount}>Delete Account</button>
        </div>
      </>
      

    )
  }

  
}

export default AccountPage;