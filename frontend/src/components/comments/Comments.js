import React, { useEffect, useState } from 'react';
import './Comments.css'

const Comments = ({ comment, userData }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [commentOwnerData, setCommentOwnerData] = useState({})
  const [clikes, setcLikes] = useState(comment.likes.length);

  const hasAlreadyLikedComment = comment.likes.includes(userData._id)
  const [hasLikedComment, setHasLikedComment] = useState(hasAlreadyLikedComment)

  useEffect(() => {
    if (token) {
      fetch(`/comments/owner/${comment.createdBy}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setCommentOwnerData(data.commentOwnerData);
        })
        .catch(error => { console.log(error) });
    }
  },[token]);

  const dateObj = new Date(comment.createdAt)

  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const handleLikes = () => {
    fetch(`/comments/${comment._id}/like`, {
      method: "PUT",
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(async data => {
        const updatedLikes = data.likes;
        setcLikes(updatedLikes);
        setHasLikedComment(!hasLikedComment)
      })
      .catch(error => {
        console.log(error);
      });
  } 

  const humanReadableTime = dateObj.toLocaleString('en-GB', options).replace(/,/g, '');

  const isTheOwner = userData._id === commentOwnerData._id
  
  return (
    <div id="comment-main-container">

      <div id='comment-owner-and-time' className={isTheOwner ? 'right' : 'left'}>
        <h2 id="comment-owner-username" className={isTheOwner ? 'right' : 'left'}>{commentOwnerData.username}</h2>
        <time dateTime={comment.createdAt}>{humanReadableTime}</time>
        <div></div>
      </div>


      <div id="comment-avatar-and-message" className={isTheOwner ? 'right' : 'left'}>
        <div id="comment-avatar-container">
          <img className="comment-avatar" alt="avatar" src={commentOwnerData.avatar}></img>
        </div>
        <div id="comment-message-container">
          <article data-cy="comment" className="comment-message" key={comment._id}>{comment.message}</article>
        </div>    
      </div>

      <div id="comment-counters" className={isTheOwner ? 'right' : 'left'}>
        <button className={hasLikedComment ? "comment-counter has-liked-comment" : "comment-counter"  } onClick={handleLikes}>{clikes} like{ clikes === 0 || clikes > 1 ? "s" : "" }</button>  {/* <--- method here */}
      </div>

    </div>
 
  )
}

export default Comments;