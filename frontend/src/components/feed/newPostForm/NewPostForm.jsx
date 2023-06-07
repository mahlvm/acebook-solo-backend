import { useState, useRef } from 'react';
import axios from 'axios';
import style from './NewPostForm.module.css'
import SubmitButton from '../../UI/SubmitButton';
import Input from '../../UI/Input';

const NewPostForm = (props) => {
  const newPost = useRef()
  const [newImg, setNewImg] = useState(null);

  const handleSubmit =  (event) => {
    if (!newPost.current.value && !newImg) return
    event.preventDefault();

    const formData = newFormData();
    axios.post('/posts', formData, requestHeader)
      .then(response => {
        if (response.status === 201) {
          props.onNewPost()
          newPost.current.value = ''
        }
        else { throw new Error('Failed to create post'); }
      })
      .catch(error => console.log(error));
  }

  const newFormData = () => {
    const formData = new FormData();
    formData.append('post', newPost.current.value);
    formData.append('img', newImg);
    return formData
  }

  const requestHeader = {
    headers: {
      'Authorization': `Bearer ${props.token}`,
      'Content-Type': 'multipart/form-data'
    }
  }

  const handleImg = (event) => {
    setNewImg(event.target.files[0]);
  }

  return (
    <>
      <form className={style["new-post-form"]} onSubmit={handleSubmit} encType='multipart/form-data'>
        <Input ref={ newPost } style='newMessage' input={{ placeholder: 'What do you have in mind?', id: 'post', type: 'text' }} />
        
        <div className={style["upload-photo-btn-container"]}>
          <input type='file' className={style["upload-photo-btn"]} accept=".png, .jpg, .jpeg" id='img' onChange={handleImg} />
          <i className="fa-regular fa-image fa-3x"></i>
          <div>
            {newImg ? <div className={style['selected-file-notification']}></div> : null }
          </div>
        </div>
        <SubmitButton style='submit-post' value='Post' />
      </form>
    </>
  );
}

export default NewPostForm;