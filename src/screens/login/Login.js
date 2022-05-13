import React, { useEffect, useRef, useState } from 'react'
import './Login.css';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({setLoginInfo}) => {
const navigate = useNavigate();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const emailRef = useRef(null);

 useEffect(() => {
    emailRef.current.focus(); 
  } , []);


  const onClickBtn = async() => {
    if(email.length === 0 || password.length === 0 ) {
        alert('내용을 채워 주세요')
        return false;
    } else {

        try{
            const result = await axios.post('http://211.169.248.225:80/api/user/login', {email, pass: password}, {})

            if(result.data[0]['ERROR'] === 1){
                alert('존재하지 않는 이메일 입니다')
                return false;
            } else if (result.data[0]['ERROR'] === 2){
                alert('패스워드가 맞지 않습니다.')
                return false;
            }else{
                
                setLoginInfo(result.data[0])
                navigate('/mypage') 
                
            }

        }catch (e){
            console.log(e);
        }
    }


  }



  return (
    <div className='LoginCont'>
        <div className='LoginBox'>
            <h2>로그인</h2>
            <h3>이메일</h3>
            <input 
                type="text" 
                name="emailItem" 
                value={email} 
                ref={emailRef}  
                className="TextInput" 
                placeholder='이메일을 입력해주세요...'
                onChange={(e) => { setEmail(e.target.value)}} 
            />

            
            <h3>패스워드</h3>
            <input 
                type="password" 
                name="emailItem" 
                value={password} 
                className="TextInput" 
                placeholder='비밀번호를 입력해주세요...'
                onChange={(e) => { setPassword(e.target.value)}} 
            />

            

        <button 
            type="submit" 
            className="Btn" 
            onClick={() => {onClickBtn()}}
        >
           로그인
        </button>

        <button 
            type="submit" 
            className="Btn" 
            onClick={() => { navigate('/register')}}
        >
           회원가입
        </button>

        </div>
    </div>
  )
}

export default Login