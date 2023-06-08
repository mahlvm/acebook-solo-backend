import React, { useEffect, useState } from 'react';
import Comments from '../Comments/Comments'
import './Post.css'
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import CommentSection from '../Comments/CommentSection';
import NewCommentInput from '../Comments/NewCommentInput';

const Post = ({ post, userData }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [ownerData, setOwnerData] = useState({});
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(post.likes.length);
  const [isVisible, setIsVisible] = useState(false)

  const hasAlreadyLiked = post.likes.includes(userData._id)
  const [hasLiked, setHasLiked] = useState(hasAlreadyLiked)

  useEffect(() => {
    if (token) {
      fetch(`/posts/${post.createdBy}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setOwnerData(data.ownerData);
          getComments()
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [token]);

  const toggleComments = (value = !isVisible) => {
    setIsVisible(value)
  }

  const getComments = () => {
    fetch (`/comments/${post._id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.json())
      .then(response => setComments(response.comments));
  }

  const handleLikes = () => {
    fetch(`/posts/${post._id}/like`, {
      method: "PUT",
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(async data => {
        const updatedLikes = data.likes;
        setLikes(updatedLikes);
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
      <CommentSection ownerData={ownerData} comments={comments} isVisible={isVisible}/>
      
      <div id="post-counters">
        <button className="post-counter" onClick={handleLikes}>
          <i className={hasLiked ? "fa-sharp fa-solid fa-heart fa-lg" : "fa-regular fa-heart fa-lg"}></i>
        </button>
        <button className="post-counter" onClick={handleLikes}>{likes} like{likes === 0 || likes > 1 ? "s" : "" }</button>
        <button className="post-counter" onClick={() => toggleComments()} >{comments.length} comment{comments.length === 0 || comments.length > 1 ? "s" : "" }</button>
      </div>

      <NewCommentInput post_id={post._id} token={token} toggleComments={toggleComments} getComments={getComments}/>
    </div>
  )
}

export default Post;
