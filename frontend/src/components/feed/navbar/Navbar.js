import React from 'react';
import './Navbar.css'

const Navbar = ({currentPage, logout, account, post }) => {
  
  return (
    <>
      <div id='navbar-container'>
        <nav id="navbar">
          <h1>ACEBOOK</h1>
          <div id="navbar-btns">
            <button className="navbar-btn">Photos</button>
            {currentPage === "posts" && <button className="navbar-btn" onClick={account}>Account</button>}
            {currentPage === "account" && <button className="navbar-btn" onClick={post}>Post</button>}
            <button className="navbar-btn" onClick={logout}>Logout</button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;