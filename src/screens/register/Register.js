import React, { useEffect, useRef, useState } from 'react'
import './Register.css';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';



const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [nick, setNick] = useState('');
   
    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus(); 
      } , []);

      const onClickBtn = async() => {
        if(email.length === 0 || password.length === 0 || passwordCheck.length === 0 || nick.length === 0) {
            alert('내용을 채워 주세요')
            return false;
        } else if (password !== passwordCheck) {
            alert('패스워드를 정확히 확인해주세요')
           
            return false;
        } else {

            try{
                const result = await axios.post('http://211.169.248.225:80/api/user/register', {
                    email,
                    pass: password,
                    nick
                }, {})
    
                if(result.data[0]['ERROR'] === 1){
                    alert('이미 존재하는 이메일 입니다')
                    return false;
                } else if (result.data[0]['ERROR'] === 2){
                    alert('이미 존재하는 닉네임입니다.')
                    return false;
                }
                
                navigate('/')
                
    
            }catch (e){
                console.log(e);
                navigate('/')
            }
        }


      }




  return (
    <div className='RegisterCont'>
        <div className='RegisterBox'>
        <h2>회원가입</h2>

            <h3>이메일</h3>
            <input 
                type="email" 
                name="emailItem" 
                value={email} 
                ref={emailRef}  
                className="TextInput" 
                placeholder='이메일을 입력해주세요...'
                onChange={(e) => { 
                    setEmail(e.target.value)
                }} 
            />

            <h3>패스워드</h3>
            <input 
                type="password" 
                name="passItem" 
                value={password} 
                className="TextInput" 
                placeholder='비밀번호를 입력해주세요...'
                onChange={(e) => { setPassword(e.target.value)}} 
            />

            <h3>패스워드 확인</h3>
            <input 
                type="password" 
                name="passItem" 
                value={passwordCheck} 
                className="TextInput" 
                placeholder='비밀번호를 입력해주세요...'
                onChange={(e) => { setPasswordCheck(e.target.value)}} 
            />

            <h3>닉네임</h3>
            <input 
                type="text" 
                name="nickitem" 
                value={nick} 
                className="TextInput" 
                placeholder='닉네임을 입력해주세요...'
                maxLength={8}
                onChange={(e) => { setNick(e.target.value)}} 
            />

            

        <button 
            type="submit" 
            className="Btn" 
            onClick={() => onClickBtn()}
        >
           회원가입
        </button>

        </div>
    </div>
  )
}

export default Register