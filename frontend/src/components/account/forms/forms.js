import React from 'react';

const EmailForm = () => {
  return (
    <>
      <form id='email-form'>
        <input placeholder="New Email" id="email" className="form-field"type='text'/>
        <button type="submit">Update</button>
      </form>
    </>
  )
}

export default EmailForm;