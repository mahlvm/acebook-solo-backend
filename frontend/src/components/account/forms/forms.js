import React, {useState} from 'react';



export const EmailForm = ({updateUser}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const newEmailInput = document.getElementById('email')
    const newEmail = newEmailInput.value;
    const changeEmail = (newEmail) => {
      updateUser('email', newEmail)
    };
    changeEmail(newEmail);
  };

  return (
    <>
      <form id='email-form' onSubmit={handleSubmit}>
        <input placeholder="New Email" id="email" className="form-field" type='text'/>
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export const UsernameForm = ({updateUser}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const newUsernameInput = document.getElementById('username')
    const newUsername = newUsernameInput.value;
    const changeUsername = (newUsername) => {
      updateUser('username', newUsername)
    };
    changeUsername(newUsername);
  };


  return (
    <>
      <form id='username-form' onSubmit={handleSubmit}>
        <input placeholder="New username" id="username" className="form-field"type='text'/>
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export const PasswordForm = () => {
  return (
    <>
      <form id='password-form'>
        <input placeholder="Current password" id="curr-password" className="form-field"type='text'/>
        <input placeholder="New password" id="new-password" className="form-field"type='text'/>
        <button type="submit">Save</button>
      </form>
      <button >Forgot password?</button>
    </>
  )
}

export const AvatarForm = ({updateUser}) => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0])
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAvatarInput = document.getElementById('profilePicture')
    const newAvatar = newAvatarInput.files[0];
    const changeAvatar = (newAvatar) => {
      updateUser('avatar', `/${newAvatar.name}`)
    };
    changeAvatar(newAvatar);
  };




  return (
    <>
      <form id='avatar-form' onSubmit={handleSubmit}>
            <div id="signup-profile-pic-upload-container">
            <div id="signup-profile-pic-upload-icon">
              <input id="profilePicture" className="form-field" type="file" accept=".png, .jpg, .jpeg" onChange={handleProfilePictureChange} />
              <i className="fa-regular fa-image fa-3x"></i>
            </div>
            <div>
              {<p className='signup-photo-filename'>{profilePicture ? profilePicture.name : "No file chosen"}</p> }
            </div>
            </div>
        <button type="submit">Save</button>
      </form>
    </>
  )
}
