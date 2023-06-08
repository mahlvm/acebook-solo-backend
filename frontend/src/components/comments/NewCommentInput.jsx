import { useRef } from 'react';
import SubmitButton from '../UI/SubmitButton';
import style from './NewCommentInput.module.css';
import Input from '../UI/Input';

const NewCommentInput = ({token, post_id, toggleComments, getComments}) => {
  const newComment = useRef()

  const submitHandler = (event) => {
    if (!newComment.current.value) return
    
    event.preventDefault();

    fetch (`/comments/${post_id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({comment: newComment.current.value})
    })
      .then(() => {
        newComment.current.value = ''
        getComments()
        toggleComments(true)
    })
      .catch(error => {
        console.log(error);
    });
  }

  const blurHandler = () => {
    setTimeout(() => {
      newComment.current.value = ''
    }, 500)
  }

  return (
    <form className={style['container']} onSubmit={submitHandler}>
      <div className={style['invisible-div']}></div>
      <Input ref={newComment} style='new-comment-field' onBlur={blurHandler} input={{ type: 'text', id: 'post', placeholder: "Comment"}} />
      <SubmitButton style='new-comments-submit-btn' />
    </form> 
  );
};

export default NewCommentInput;