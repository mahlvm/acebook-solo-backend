const navigationContext = React.createContext()

export const navigationContextProvider = (props) => {

  const toPosts = () => navigate('/posts')

  const toAccount = () => {
    navigate('/account', {state: { userData: userData, token: token}})
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  return (
    <navigationContext.Provider value={{
      toPosts: toPosts,
      toAccount: toAccount,
      logout: logout
    }}>
      {props.children}
    </navigationContext.Provider>
  );
};

export default navigationContext;