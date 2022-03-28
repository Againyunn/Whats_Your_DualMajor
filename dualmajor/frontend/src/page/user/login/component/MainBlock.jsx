import React from 'react'
import styled from 'styled-components'
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

export default function MainBlock() {
  return (
    <BodyBlock/>
  )
}
//CSS
const MainBlockStyle = styled.div`
form.container{
    display: grid;
    grid-template-columns: 1fr 1fr 3fr 1fr;
    grid-template-rows: 3fr 0.7fr 0.7fr 1fr 3fr;
    background-color: white;
    text-align: center;

    row-gap: 15px;
    
    height: 75vh;
    width: 45vh;
  }

  /*아이디*/
  .ID{
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;

    padding-top:20%;

    /*글씨*/
    font-size: 19.5px;
    color: black;
    font-weight: bold;
  }

  /*아이디입력칸*/
  .IDBlock{
    /*레이아웃*/
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;

    /*모양*/
    margin-right: 5px;
    border-radius: 10px;

    /*글씨*/
    font-size: 18px;
    color: black;
    font-weight: bold;

    /*호버*/
    &:hover {
        border: solid 1px #002F5A;
        opacity: 0.9;
    }
  }

  /*패스워드*/
  .PW{
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;

    padding-top:20%;

    /*글씨*/
    font-size: 19.5px;
    color: black;
    font-weight: bold;


  }

  /*패스워드입력칸*/
  .PWBlock{
    /*레이아웃*/
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;


    /*모양*/
    margin-right: 5px;
    border-radius: 10px;

    /*글씨*/
    font-size: 18px;
    color: black;
    font-weight: bold;

    /*호버*/
    &:hover {
        border: solid 1px #002F5A;
        opacity: 0.9;
    }
  }

  /*로그인 버튼*/
  button.Login{
    /*레이아웃*/
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 4;
    grid-row-end: 5;

    /*색*/
    background-color: #002F5A;
    opacity: 0.8;

    /*모양*/
    margin-right: 5px;
    border-radius: 10px;

    /*글씨*/
    font-size: 19.5px;
    color: white;
    font-weight: bold;

    /*호버*/
    &:hover {
      background-color: #002F5A;
      opacity: 0.9;
    }
  }
`

function BodyBlock(){
    return(
      <MainBlockStyle>
        <form className='container' method='post' action='/join중원,승기 백엔드 API'>
          <span className='ID'>ID</span>
          <input className='IDBlock' type={"email"} size={"15"} 
            placeholder="학번@hufs.ac.kr" pattern="[0-9]{5-9}@hufs.ac.kr"
          ></input>
          <span className='PW'>PW</span>
          <input className='PWBlock' type={"password"} size={"15"}></input>
          <button className='Login' type='submit'>Log in</button>
        </form>
      </MainBlockStyle>
    );
  }