import React, {useState} from "react";

const MainContext = React.createContext()

export const MainContextProvider = (props) => {
  const [userData, setUserData] = useState({})

  const storeUserData = (data) => {
    setUserData(data)
  }

  console.log(userData)
  // const toPosts = () => navigate('/posts')

  // const toAccount = () => {
  //   navigate('/account', {state: { userData: userData, token: token}})
  // }

  // const logout = () => {
  //   window.localStorage.removeItem("token")
  //   navigate('/login')
  // }

  return (
    <MainContext.Provider value={{
      userData: userData,
      storeUserData: storeUserData
      // toPosts: toPosts,
      // toAccount: toAccount,
      // logout: logout
    }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;