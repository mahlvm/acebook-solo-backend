import React from 'react';

export const EmailForm = () => {
  return (
    <>
      <form id='email-form'>
        <input placeholder="New Email" id="email" className="form-field"type='text'/>
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export const UsernameForm = () => {
  return (
    <>
      <form id='username-form'>
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
