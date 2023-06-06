import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext()

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"))

  const storeToken = (token) => {
    window.localStorage.setItem("token", token)
    console.log(window.localStorage.token)
  }
  const removeToken = () => {
    window.localStorage.removeItem("token")
    console.log(window.localStorage.token)
  }

  return (
    <AuthContext.Provider value={{
      token: token,
      storeToken: storeToken,
      removeToken: removeToken
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;