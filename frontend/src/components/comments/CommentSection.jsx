import React, { useState, useEffect, useContext } from 'react';
import style from './CommentSection.module.css'

import Comments from './Comments';
import MainContext from '../../context/mainContext';

const CommentContext = React.createContext()

export const CommentSection = (props) => {
  const mainContext = useContext(MainContext)
  const [comments, setComments] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (props.token) { fetchComments() }

    return () => setComments([])
    
  }, [])

  const fetchComments = () => {
    fetch (`/comments/${props.post_id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      }
    }).then(response => response.json())
      .then(data => {
        setComments(data.comments)
        props.storeToken(data.token)
      });
  }

  const toggleComments = () => {
    setIsVisible(!isVisible)
  }

  return (
    <CommentContext.Provider value={{
      isVisible: isVisible,
      comments: comments,
      setVisibility: setIsVisible,
      toggleComments: toggleComments,
      fetchComments: fetchComments
    }}>
      <div className={isVisible ? style['open'] : style['close']}>
        {comments.map(
          comment => (<Comments key={comment._id} comment={comment} userData={ mainContext.userData } ownerData={props.ownerData} />)
        )}
      </div>
      {props.children}
    </CommentContext.Provider>

  );
};

export default CommentContext;