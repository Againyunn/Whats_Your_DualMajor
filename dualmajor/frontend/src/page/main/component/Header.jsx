//메인 화면의 header (메뉴 버튼 있음)
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css';
import MyModal from './MyModal';
import axios from 'axios'
import '../../../media/css/header.css';

export default function Header({showMenu}) {
  //로그인 여부 확인(기본 값: 로그인 false)
  const [login, setLogin] = useState(false);
  const [thisUser, setThisUser] = useState('');

  const [modalShow, setModalShow] = useState(false); //모달을 통해 유저 정보 화면에 랜더링

  //로그인 되어있는 지 확인
  useEffect( () =>{
    if(sessionStorage.getItem("user")!=null){
      setLogin(true);
    }
    else{
      setLogin(false);
    }
  })

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
    <>
      <div className='containerHeader'>
        <div className='logo'>
          <Link to={'/'}>
            <img src={require('../../../media/structure/부_원형.jpg')} alt='로고' />
          </Link>
        </div>
        <div className='blank'>
          <Link className= 'blank' style={{textDecoration: 'none', color: '#002F5A'}} to={'/'}>
            <span>너의 이중전공은?</span>
          </Link>
        </div>
        {
        !showMenu?
          <>
            <div className='menu'>
              <img src={require('../../../media/structure/무지.jpg')} alt='무지'></img>
            </div>
          </>:
          <>
            {
              login === false ?
              <div className='menu'>
                <Link style={{textDecoration: 'none' }} to={'/choose'}>
                  <img src={require('../../../media/tab/메뉴.png')} alt='메뉴'/>
                </Link>
              </div>
              :
              <div className='menu' onClick={()=> setModalShow(true)}>
                <img src={require('../../../media/tab/메뉴.png')} alt='메뉴'/>
              </div>
            }
          </>
        }
      </div>
      <MyModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}
// login? MyModal(thisUser): location.href='http://localhost:3000/#/choose'

// const BackgroundBlock = styled.div`
//   div.containerHeader{
//     min-height: 3vh;
//     display: grid;
//     grid-template-columns: 1fr 4fr 1fr;
//     background-color: white;

    
//     padding-bottom: 15px;
//     border-bottom: solid 2px #002F5A;
//   }

//   div.menu{
//     grid-column-start: 3;
//     grid-column-end: 4;
//     padding-top: 10px;


//     background-color: white;

//     /*이미지*/
//     img{
//       width: 35px;
//       height: 35px;
//     }

//     /*호버*/
//     &:hover {
//       background-color: white;
//       opacity: 0.6;
//     }
//   }

//   div.blank{
//     grid-column-start: 2;
//     grid-column-end: 3;

//     /*글씨*/
//     padding-top: 5%;
//     font-size: 18px;
//     color: #002F5A;
//     font-weight: bold;

//     /*호버*/
//     &:hover {
//       background-color: white;
//       opacity: 0.6;
//     }
//   }

//   div.logo{
//     grid-column-start: 1;
//     grid-column-end: 2;
//     padding-top: 10px;

//     background-color: white;

//     img{
//       width: 40px;
//       height: 40px;
//     }

//     /*호버*/
//     &:hover {
//       background-color: white;
//       opacity: 0.6;
//     }
//   }
//   `

// ={process.env.PUBLIC_URL +`${'/media/structure/메뉴2.jpg'}`