import React from 'react';

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
      <form id='email-form' class="component-form" onSubmit={handleSubmit}>
        <input placeholder="New Email" id="email" className="form-field component-input" type='text'/>
        <button className="my-account-btn" type="submit">Save</button>
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
      <form id='username-form' class="component-form"  onSubmit={handleSubmit}>
        <input placeholder="New username" id="username" className="form-field component-input"type='text'/>
        <button type="submit" className="my-account-btn">Save</button>
      </form>
    </>
  )
}

export const PasswordForm = () => {
  return (
    <>
      <form id='password-form' class="component-form" >
        <input placeholder="Current password" id="curr-password" className="form-field component-input"type='text'/>
        <input placeholder="New password" id="new-password" className="form-field component-input" type='text'/>
        <button type="submit" className="my-account-btn" >Save</button>
      </form>
      {/* <button >Forgot password?</button> */}
    </>
  )
}

export const AvatarForm = ({profilePicture}) => {
  return (
    <>
      <form id='avatar-form' class="component-form" >
            <div id="my-account-page-profile-pic-upload-container">
              <div id="signup-profile-pic-upload-icon">
                <input id="profilePicture" className="form-field component-input change-avatar" type="file" accept=".png, .jpg, .jpeg" />
                <i className="fa-regular fa-image fa-3x"></i>
              </div>
            <div>
              {<p className='signup-photo-filename'>{profilePicture ? profilePicture.name : "No file chosen"}</p> }
            </div>
            </div>
        <button type="submit" className="my-account-btn">Save</button>
      </form>
    </>
  )
}
