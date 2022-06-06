//메인 홈 화면
import {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "./component/Header";
import Footer from "./component/Footer"
import MainFrame from "./component/MainFrame";
import '../../media/css/commonFrame.css';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

function Main() {

  //상단바 컨트롤 : 메뉴바 노출 상태관리
  const showMenu = true;

  //하단바 컨트롤 : 
  const showPrev = false;
  const showNext = false;
  const showDev = true;


  return (
    <>
      <div className="mainContainer">
        <div className="header"><Header showMenu={showMenu}/></div>
        <div className="mainBody"><MainFrame/></div>
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

export default Main;

// const MainBlockStyle = styled.div`
//   width: 100%;
//   height: 100%;

//   div.mainContainer{
//     display: grid;
//     grid-template-rows: 1.3fr 6fr 0.5fr;
//     background-color: white;
//     text-align: center;
//     justify-content: center;
//     vertical-align: middle;
    
//     /*border: solid 1px #002F5A;*/

//     z-index:0;
//   }


//   div.header{
//     gird-row-start: 0;
//     grid-row-start: 1;

//     z-index:1;
//   }

//   div.mainBody{
//     gird-row-start: 1;
//     grid-row-start: 2;
//   }

//   div.footer{
//     margin-top:10px;
//     bottom:0px;
//     gird-row-start: 2;
//     grid-row-start: 3;
//     z-index:1;
//   }
// `



// const Form = styled.form`
//   div.container{
//     display: flex;
//     flex-direction: column;
//     flex-wrap: wrap;
    
//     margin-top: 20px;
//     margin-bottom: 10px;
//     align-items: left;
//   }

//   input.small{
//     flex-basis: 50%;

//     &:hover {
//       background-color: #EEEEEE;
//       color: black;
//     }
//   }

//   input.body{
//     flex-basis: 100%;

//     &:hover {
//       background-color: #EEEEEE;
//       color: black;
//     }
//   }

//   button{
//     background-color: #AAF0FF;
//     color: black;

//     &:hover {
//       background-color: #87CEFA;
//     }
//   }
// `