import React, {  useEffect, useState } from 'react'
import './Mypage.css';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const Mypage = ({loginInfo, setLoginInfo}) => {
  const navigate = useNavigate();

  useEffect(() => {

    if(Object.keys(loginInfo).length === 0){
      navigate('/')
    }

    

  } , [loginInfo])


  const handleFileInput = (e) =>{
    e.preventDefault();

      const formData = new FormData();
      formData.append('file', e.target.files[0]);

  
      axios({
        method: 'post',
        url: 'http://211.169.248.225:80/upload',
        data: formData,
        headers: {
          'content-type': 'multipart/form-data',
          uid: loginInfo.UID
        },
      }).then((response) => setLoginInfo(response.data) )
      .catch((err) => console.log(err))

  }

 
const logout = () => {
  setLoginInfo({});
  navigate('/')
}

  return (
    <div className='MypageCont'>
        <div className='MypageBox'>
            {loginInfo.IMAGE ? 
              <img 
                src={'http://211.169.248.225:80'+loginInfo.IMAGE.slice(27)}
                alt="샘플이미지"
                className='userImg'
              />
              :
              <img 
                src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png" 
                alt="샘플이미지"
                className='userImg'
             />}
            
            <h4>{loginInfo.NICK}</h4>

              <input 
                className='imgInput'
                type="file"
                accept='image/jpg,impge/png,image/jpeg,image/gif' 
                name="file" 
                onChange={e => handleFileInput(e)}
              />

              <button 
                  className="Btn" 
                  onClick={() => {logout()}}
              >
                로그아웃
              </button>

        </div>
    </div>
  )
}

export default Mypage