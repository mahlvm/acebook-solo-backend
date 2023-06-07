import { useState } from 'react';
import axios from 'axios';
import './NewPostForm.css'
import SubmitButton from '../../UI/SubmitButton';

const NewPostForm = (props) => {
  const [newPost, setNewPost] = useState("");
  const [newImg, setNewImg] = useState(null);

  const handleSubmit =  (event) => {
    if (!newPost && !newImg) return
    event.preventDefault();

    const formData = newFormData();
    axios.post('/posts', formData, {
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
        if (response.status === 201) { props.onNewPost() }
        else { throw new Error('Failed to create post'); }
      })
      .catch(error => console.log(error));
  }

  const newFormData = () => {
    const formData = new FormData();
    formData.append('post', newPost);
    formData.append('img', newImg);
    return formData
  }

  const handleNewPostChange = (e) => {
    setNewPost(e.target.value)
  }

  const handleImg = (event) => {
    setNewImg(event.target.files[0]);
  }

  return (
    <>
      <form className="new-post-form" onSubmit={handleSubmit} encType='multipart/form-data'>        
        <input type='text' id='post' className="text-field" placeholder="What do you have in mind?" value={newPost} onChange={handleNewPostChange} />
        
        <div id="upload-photo-btn-container">
          <input type='file' className="upload-photo-btn" accept=".png, .jpg, .jpeg" id='img' onChange={handleImg} />
          <i className="fa-regular fa-image fa-3x"></i>
          <div>
            {newImg ? <div id='selected-file-notification'></div> : null }
          </div>
        </div>
        <SubmitButton style='submit-post' value='Post' />
      </form>
    </>
  );
}

export default NewPostForm;