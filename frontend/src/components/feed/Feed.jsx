import Post from '../post/Post'
import axios from 'axios';
import UserBanner from './userBanner/UserBanner';
import NavBar from '../UI/NavBar';
import NewPostForm from './newPostForm/NewPostForm';
import EmptyPage from './emptyPage/EmptyPage';

import React, { useState, useEffect, useContext } from 'react';
import MainContext from '../../context/mainContext';
import style from './Feed.module.css';

const Feed = ({ navigate }) => {
  const mainContext = useContext(MainContext)

  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      loadPosts()
    }
  }, [token])

  const loadPosts = () => {
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

  const feed = () => {
    if (posts.length === 0) { return <EmptyPage /> }
    else {
      return posts.map((post) => {
        return <Post post={post} userData={mainContext.userData} key={post._id} />
      })
    }
  }

  if(token) {
    return(
      <>
        <NavBar currentPage='Home' />
        <div className={style['feed__container']} >
          <div className={style["user-banner__container"]}>
            <UserBanner userData={mainContext.userData} />
            <NewPostForm onNewPost={loadPosts} token={token} />
          </div>
          <div id='feed' role="feed">
            { feed() }
          </div>
        </div>     
      </>
    );
  } else {
    navigate('/signup');
    return null;
  }
}

export default Feed;
