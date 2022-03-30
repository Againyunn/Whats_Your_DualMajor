//메인 홈 화면
import {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "./component/Header";
import Footer from "./component/Footer"
import MainFrame from "./component/MainFrame";


function Main() {
    // const [rows, setRows]= useState(1)


  return (
    <>
      <MainBlockStyle>
        <div className="mainContainer">
          <div className="header"><Header/></div>
          <div className="mainBody"><MainFrame/></div>
          <div className="footer"><Footer/></div>
        </div>
      </MainBlockStyle>
      
    </>

  );
}

export default Main;

const MainBlockStyle = styled.div`

  div.mainContainer{
    display: grid;
    grid-template-rows: 1.3fr 6fr 0.5fr;
    background-color: white;
    text-align: center;
    justify-content: center;
    vertical-align: middle;
    
    /*border: solid 1px #002F5A;*/

    z-index:0;
  }


  div.header{
    gird-row-start: 0;
    grid-row-start: 1;

    z-index:1;
  }

  div.mainBody{
    gird-row-start: 1;
    grid-row-start: 2;
  }

  div.footer{
    margin-top:10px;
    bottom:0px;
    gird-row-start: 2;
    grid-row-start: 3;
    z-index:1;
  }
`



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