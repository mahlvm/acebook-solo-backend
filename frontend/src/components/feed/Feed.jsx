import Post from '../post/Post'
import axios from 'axios';
import UserBanner from './userBanner/UserBanner';
import NavBar from '../UI/NavBar';
import NewPostForm from './newPostForm/NewPostForm';
import EmptyPage from './emptyPage/EmptyPage';

import React, { useEffect, useState, useContext } from 'react';
import MainContext from '../../context/mainContext';
import './Feed.css';

const Feed = ({ navigate }) => {
  const mainContext = useContext(MainContext)

  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("");
  const [newImg, setNewImg] = useState(null);

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

  const handleSubmit =  (event) => {
    if (!newPost && !newImg) return
    event.preventDefault();

    const formData = newFormData();
    axios.post('/posts', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
        if (response.status === 201) { loadPosts() }
        else { throw new Error('Failed to create post'); }
      })
      .catch(error => console.log(error));

  }

  // HELPER METHODS -----------------

  const newFormData = () => {
    const formData = new FormData();
    formData.append('post', newPost);
    formData.append('img', newImg);
    return formData
  }

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  }

  const handleImg = (event) => {
    setNewImg(event.target.files[0]);
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
        <div id='main-container' >
          <div id="user-banner-container">
            <UserBanner userData={mainContext.userData} />
            <NewPostForm newPost={newPost} newImg={newImg} handleImg={handleImg} handleNewPostChange={handleNewPostChange} handleSubmit={handleSubmit}/>
          </div>
          
          <div id='feed' role="feed">
            { feed() }
          </div>
        </div>     
      </>
    );
  } else {
    navigate('/signin');
    return null;
  }
}

export default Feed;
