import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext()

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"))

  const storeToken = (token) => {
    window.localStorage.setItem("token", token)
  }

  useEffect(() => {
    console.log('TOKEN FROM CONTEXT', token)
  }, [token])


  return (
    <AuthContext.Provider value={{
      storeToken: storeToken,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;