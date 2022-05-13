import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {  useState } from 'react';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import Mypage from './screens/mypage/Mypage';

function App() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({});



  return (
    <div className="App">
          <Routes>

                <Route path="/" element={<Login loginInfo={loginInfo} setLoginInfo={setLoginInfo} />}>
                </Route>
                <Route path="/register" element={<Register />}>
                </Route> 
                <Route path="/mypage" element={<Mypage loginInfo={loginInfo} setLoginInfo={setLoginInfo} />}>
                </Route> 
                
          </Routes> 
    </div>
  );
}

export default App;
