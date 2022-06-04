//로그인 창
import React from 'react'
// import styled from 'styled-components';
import Header from '../../main/component/Header';
import MainBlock from './component/MainBlock';
import Footer from '../../main/component/Footer';
import '../../../media/css/commonFrame.css'
// import OnlyPrevFooter from '../../../common/footer/OnlyPrevFooter'

export default function Login() {
    //메뉴바 노출 상태관리
    const showMenu = false;

    //하단바 컨트롤 : 
    const showPrev = true;
    const showNext = false;
    const showDev = false;

    return (
        <>
          <div className="mainContainer">
              <div className="header"><Header showMenu={showMenu}/></div>
              <div className='mainBody'><MainBlock link={"/"}/></div>
              <div className='footer'><Footer  showPrev={showPrev} showNext={showNext} showDev={showDev}/></div>
          </div>
        </>
      )
    }
    
 