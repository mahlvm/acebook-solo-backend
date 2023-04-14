import React, { useEffect, useState } from 'react';
import Comments from '../comments/Comments'
import './Post.css'

const Post = ({ post, userData }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [ownerData, setOwnerData] = useState({});
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(post.likes.length);
  const [isVisible, setIsVisible] = useState(false)

  const hasAlreadyLiked = post.likes.includes(userData._id)
  const [hasLiked, setHasLiked] = useState(hasAlreadyLiked)

  console.log('POST', post.likes)
  console.log('USER', userData._id)



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
        }).then(getComments())
        .catch(error => {
          console.log(error);
        });
    }
  }, [token]);


  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  }

  const handleSubmit = (event) => {
    if (!newComment) return
    setIsVisible(true)

    event.preventDefault();

    fetch (`/comments/${post._id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({comment: newComment})
    }).then(response => {
      setNewComment("");
      getComments(); 
    })
    .catch(error => {
      console.log(error);
    });
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

  const dateObj = new Date(post.createdAt)
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const humanReadableTime = dateObj.toLocaleString('en-GB', options).replace(/,/g, '');

  const hasImage = 'image' in post // boolean: check if post has an image
  let imageLocation;
  if (hasImage) { imageLocation = `/uploads/${post.image.fileName}` }

  const handleCommentBtnClick = () => {
    if (!comments.length) return
    setIsVisible(!isVisible)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setNewComment("")
    }, 500)
  }

  return(
    <div id="post-container">

      <div id="post-header">
        <div id="post-avatar-container">
          <img className="post-avatar" alt="avatar" src={ownerData.avatar}></img>
        </div>
        <div id="post-inner-header">
          <h3 className="post-owner-username">{ownerData.username}</h3>
          <time dateTime={post.createdAt}>{humanReadableTime}</time>
        </div>
      </div>

      <div id='post-content'>
        <article data-cy="post" className="post-message" key={post._id}>{post.message}</article>
        <div id="post-content-image">
        {hasImage ? <img src={imageLocation}></img> : null }
      </div>
      </div>

      <div id="comments-container" className={ isVisible ? 'open-comments' : 'close-comments' }>
        {comments.map(
          comment => (<Comments comment={comment} userData={ userData } ownerData={ownerData} key={comment._id} />)
        )}
      </div>
      
      <div id="post-counters">
        <button className="post-counter" onClick={handleLikes}>
          <i className={hasLiked ? "fa-sharp fa-solid fa-heart fa-lg" : "fa-regular fa-heart fa-lg"}></i>
        </button>
        <button className="post-counter" onClick={handleLikes}>{likes} like{likes === 0 || likes > 1 ? "s" : "" }</button>
        <button className="post-counter" onClick={ handleCommentBtnClick } >{comments.length} comments</button>
      </div>


      <div id="new-comments-container">
        <div className="invisible"></div>
        <input
          type='text'
          id='post'
          className="new-comment-field"
          placeholder="Comment"
          value={newComment}
          onChange={handleNewCommentChange}
          onBlur={handleBlur}>
          
          </input>
        <button className="new-comments-submit-btn" onClick={handleSubmit }><i className="fa-regular fa-envelope fa-2x"></i></button>
      </div> 

    </div>
  )
}

export default Post;
