import React from 'react';

export const EmailForm = () => {
  return (
    <>
      <form id='email-form'>
        <input placeholder="New Email" id="email" className="form-field"type='text'/>
        <button type="submit">Update</button>
      </form>
    </>
  )
}

export const UsernameForm = () => {
  return (
    <>
      <form id='username-form'>
        <input placeholder="New username" id="username" className="form-field"type='text'/>
        <button type="submit">Update</button>
      </form>
    </>
  )
}
