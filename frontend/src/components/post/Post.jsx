import React, { useContext, useEffect, useState } from 'react';
import Comments from '../Comments/Comments'
import './Post.css'
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import { CommentSection } from '../Comments/CommentSection';
import NewCommentInput from '../Comments/NewCommentInput';
import PostCounters from './PostCounters';

const Post = ({ post, userData }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [ownerData, setOwnerData] = useState({});
  const [likes, setLikes] = useState(post.likes.length);
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    if (post.likes.includes(userData._id))
    { setHasLiked(true) }
  }, [])

  useEffect(() => {
    if (token) {
      fetch(`/posts/${post.createdBy}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          window.localStorage.setItem("token", data.token);
          setToken(data.token);
          setOwnerData(data.ownerData);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [token]);

  const handleLikes = () => {
    fetch(`/posts/${post._id}/like`, {
      method: "PUT",
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(async data => {
        setLikes(data.likes);
        setHasLiked(!hasLiked)
      })
      .catch(error => {
        console.log(error);
      });
  }

  return(
    <div id="post-container">
      <PostHeader ownerData={ownerData} post={post} />
      <PostContent post={post} />
      <CommentSection post_id={post._id} ownerData={ownerData} token={token} storeToken={setToken} >
        <PostCounters handleLikes={handleLikes} likes={likes} hasLiked={hasLiked} />
        <NewCommentInput post_id={post._id} token={token} />
      </CommentSection>
    </div>
  )
}

export default Post;
