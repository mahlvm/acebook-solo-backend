import React, { useState } from 'react';
import axios from 'axios'

const AvatarForm = ({ updateUser, userData, token, navigate }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0])
  }
  
  const handleSubmit = (event) => {
    if (!profilePicture) return
    event.preventDefault();

    const formData = new FormData()
    formData.append('profilePicture', profilePicture)

    axios.put(`/users/${userData._id}` , formData, {
      headers: {
        'Authorization': `Bearer${token}`,
        'contentType':  'multipart/form-data'
      }
    }).then(response => {
      if (response.status === 201) { reloadFeedPage() }
      else { throw new Error('Failed to update picture'); }
    })
      .catch(err => console.log(err))
  };

  // HELPER -------------------

  const reloadFeedPage = () => {
    navigate('/posts');
    window.location.reload(); 
  }

  return (
    <>
      <form id='avatar-form' className="component-form" onSubmit={handleSubmit}>
          <div id="my-account-page-profile-pic-upload-container">
            <div id="my-account-page-profile-pic-upload-icon">
              <input id="profilePicture" className="form-field component-input" type="file" accept=".png, .jpg, .jpeg" onChange={handleProfilePictureChange} />
              <i className="fa-regular fa-image fa-3x"></i>
            </div>

            <div>
              {<p className='signup-photo-filename'>{profilePicture ? profilePicture.name : "No file chosen"}</p> }
            </div>
          </div>
          <input type="submit"></input>
      </form>
    </>
  )
}

export default AvatarForm