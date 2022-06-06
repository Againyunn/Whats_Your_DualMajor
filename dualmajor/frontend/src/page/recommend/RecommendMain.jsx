//메인 홈 화면
import React from 'react'
// import {useState, useEffect} from "react";
// import axios from "axios";
// import styled from "styled-components";
import Header from "../main/component/Header";
import Footer from "../main/component/Footer"

import '../../media/css/commonFrame.css';
import MainFrame from "./question1/MainFrame";
import {OverlayTrigger, Tooltip} from 'react-bootstrap';


function RecommendMain() {

  //상단바 컨트롤 : 메뉴바 노출 상태관리
  const showMenu = false;

  //하단바 컨트롤 : 
  const showPrev = true;
  const showNext = false;
  const showDev = true;


  return (
    <>
      <div className="mainContainer">
        <div className="header"><Header showMenu={showMenu}/></div>
        <div className="mainBody"><MainFrame/> </div>
        <OverlayTrigger
              key='dev'
              placement='top'
              overlay={
                <Tooltip id="dev">
                  <strong>DB설계:</strong>&nbsp;GBT학부 박동렬<br/>
                  <strong>FE개발:</strong>&nbsp;GBT학부 정재윤<br/>
                  <strong>BE개발:</strong><br/>
                   &nbsp;&nbsp;세르비아크로아티아어과 최중원,<br/>
                   &nbsp;&nbsp;브라질학과 류승기
                </Tooltip>
              }
            >
              <div className="footer"><Footer showPrev={showPrev} showNext={showNext} showDev={showDev}/></div>
            </OverlayTrigger>
      </div>
    </>
  );
}

export default RecommendMain;