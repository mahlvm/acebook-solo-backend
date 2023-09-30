import LoginForm from '../authPage/LoginForm'
import SignUpForm from '../authPage/SignUpForm'
import AccountPage from '../account/Account';
import Feed from '../HomePage/HomePage'

import { useNavigate, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
    return (
        <Routes>
          <Route path='/' element={<Navigate to="/signup" />}/>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/account' element={<AccountPage navigate={ useNavigate() }/>}/>
        </Routes>
    );
}

export default App;
