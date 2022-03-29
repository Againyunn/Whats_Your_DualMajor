//메인 화면의 header (메뉴 버튼 있음)
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css';
import MyModal from './MyModal';
import axios from 'axios'

export default function Header() {
  //로그인 여부 확인(기본 값: 로그인 false)
  const [login, setLogin] = useState(false);
  const [thisUser, setThisUser] = useState('');

  //Login값이 바뀔 때만 로그인 정보 받아오기
  useEffect( ()=>{
    //axios로 백엔드에서 로그인 정보 API받아오기
    axios.get('백엔드 로그인 API 주소') //get방식
          .then(Response => {

            if(Response.data == false){ //falsy한 값인 경우
              setThisUser('');
              setLogin(false);
            }
            else{
              setThisUser(Response.data);   //data안에 여러 내부 객체 값 지정해서 백엔드에서 넘기기
              setLogin(true);
              
              //유저 확인
              console.login("this User ID : ",thisUser);
            }
            //로그인 확인
            console.log("login status:",login);

          })
          .catch((Error) =>{
              console.log(Error);
          })
  }, [setThisUser]) 

  //메뉴 버튼이 눌리면 작동
  function ChooseOption(){
    //로그인 상태x라면 (false)
    if( login === false ){
      //로그인 or 회원가입 페이지로 이동
      // window.location.href='http://localhost:3000/#/choose';
      return(
      <div className='menu'>
        <Link style={{textDecoration: 'none' }} to={'/choose'}>
          <img src={require('../../../media/tab/메뉴.png')} alt='메뉴'/>
        </Link>
       </div>
      )
    }

    //로그인 된 상태 (true)
    else{
      return(
        //유저 정보를 담은 모달에 현재 userdata 전달
        <div className='menu' onClick={()=>MyModal()}>
          <img src={require('../../../media/tab/메뉴.png')} alt='메뉴'/>
        </div>
      )
    }
  }


  return (
    <BackgroundBlock>
      <div className='containerHeader'>
        <div className='logo'>
          <Link to={'/'}>
            <img src={require('../../../media/structure/로고.png')} alt='로고' style={{width: "40px", height: "40px"}}/>
          </Link>
        </div>
        <div className='blank'>
          <Link className= 'blank' style={{textDecoration: 'none', color: '#002F5A'}} to={'/'}>
            <span>너의 이중전공은?</span>
          </Link>
        </div>
        <ChooseOption/>
      </div>
    </BackgroundBlock>
  )
}
// login? MyModal(thisUser): location.href='http://localhost:3000/#/choose'

const BackgroundBlock = styled.div`
  div.containerHeader{
    min-height: 3vh;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    background-color: white;

    
    padding-bottom: 15px;
    border-bottom: solid 2px #002F5A;
  }

  div.menu{
    grid-column-start: 3;
    grid-column-end: 4;
    padding-top: 10px;


    background-color: white;

    /*이미지*/
    img{
      width: 35px;
      height: 35px;
    }

    /*호버*/
    &:hover {
      background-color: white;
      opacity: 0.6;
    }
  }

  div.blank{
    grid-column-start: 2;
    grid-column-end: 3;

    /*글씨*/
    padding-top: 5%;
    font-size: 18px;
    color: #002F5A;
    font-weight: bold;

    /*호버*/
    &:hover {
      background-color: white;
      opacity: 0.6;
    }
  }

  div.logo{
    grid-column-start: 1;
    grid-column-end: 2;
    padding-top: 10px;

    background-color: white;

    img{
      width: 40px;
      height: 40px;
    }

    /*호버*/
    &:hover {
      background-color: white;
      opacity: 0.6;
    }
  }
  `

// ={process.env.PUBLIC_URL +`${'/media/structure/메뉴2.jpg'}`