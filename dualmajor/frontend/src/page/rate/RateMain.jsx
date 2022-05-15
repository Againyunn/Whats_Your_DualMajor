//메인 홈 화면

import {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../main/component/Header";
import Footer from "../main/component/Footer";

import '../../media/css/commonFrame.css';
import MainFrame from "./MainFrame";

function RateMain() {

  //상단바 컨트롤 : 메뉴바 노출 상태관리
  const showMenu = false;

  //하단바 컨트롤 : 
  const showPrev = true;
  const showNext = false;
  const showDev = false;


  return (
    <>
      <div className="mainContainer">
        <div className="header"><Header showMenu={showMenu}/></div>
        <div className="mainBody"><MainFrame/> </div>
        <div className="footer"><Footer showPrev={showPrev} showNext={showNext} showDev={showDev}/></div>
      </div>
    </>
  );
}

export default RateMain;