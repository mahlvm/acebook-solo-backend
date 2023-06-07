import React, { useState } from "react";
import { useNavigate } from 'react-router';

const MainContext = React.createContext()

export const MainContextProvider = (props) => {
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()

  const storeUserData = (data) => {
    setUserData(data)
  }

  const navigateTo = {
    posts: () => navigate('/posts'),
    account: () => { 
      const params = {
        state: {
          userData: userData,
          token: window.localStorage.getItem("token")
        }
      }
      navigate('/account', params)
    },
    logout: () => {
      window.localStorage.removeItem("token")
      navigate('/login')
    }
  }

  return (
    <MainContext.Provider value={{
      userData: userData,
      storeUserData: storeUserData,
      navigateTo: navigateTo
    }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;