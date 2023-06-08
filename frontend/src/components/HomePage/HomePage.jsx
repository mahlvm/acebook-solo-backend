import React, { useState, useEffect, useContext } from 'react';
import MainContext from '../../context/mainContext';
import style from './HomePage.module.css';

import UserBanner from './userBanner/UserBanner';
import NavBar from '../UI/NavBar';
import NewPostForm from './newPostForm/NewPostForm';
import Feed from './Feed/Feed';

const HomePage = ({ navigate }) => {
  const mainContext = useContext(MainContext)
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) { fetchPosts() }
    return () => setPosts([])
  }, [token])

  const fetchPosts = () => {
    fetch("/posts", {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setPosts(data.posts);
        mainContext.storeUserData(data.user)
      })
      .catch(error => console.log(error));
  }

  if(token) {
    return(
      <>
        <NavBar currentPage='Home' />
        <div className={style['feed__container']} >
          <div className={style["user-banner__container"]}>
            <UserBanner userData={mainContext.userData} />
            <NewPostForm onNewPost={fetchPosts} token={token} />
          </div>
          <Feed posts={ posts } />
        </div>     
      </>
    );
  } else {
    navigate('/signup');
    return null;
  }
}

export default HomePage;
