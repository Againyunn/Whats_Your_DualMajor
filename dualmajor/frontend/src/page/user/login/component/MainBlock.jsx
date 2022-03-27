import React from 'react'
import styled from 'styled-components'

export default function MainBlock() {
  return (
    <BodyBlock/>
  )
}
//CSS
const MainBlockStyle = styled.div`
div.container{
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 3fr 1fr 1fr 1fr 3fr;
    background-color: white;
    text-align: center;

    row-gap: 10px;
    
    height: 75vh;
    width: 45vh;
  }

  /*아이디*/
  input.ID{
    /*레이아웃*/
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;

    /*모양*/
    margin-right: 5px;
    border-radius: 10px;

    /*글씨*/
    padding-top: 10%;
    font-size: 19.5px;
    color: black;
    font-weight: bold;

    /*호버*/
    &:hover {
        border: solid 2px #002F5A;
        opacity: 0.9;
    }

  }

  /*패스워드*/
  input.PW{
    /*레이아웃*/
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;


    /*모양*/
    margin-right: 5px;
    border-radius: 10px;

    /*글씨*/
    padding-top: 10%;
    font-size: 19.5px;
    color: black;
    font-weight: bold;

    /*호버*/
    &:hover {
        border: solid 2px #002F5A;
        opacity: 0.9;
    }
  }

  /*로그인 버튼*/
  button.Login{
    /*레이아웃*/
    grid-column-start: 2;
    grid-column-end: 3;
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
        <div className='container'>
          <input className='ID'></input>
          <input className='PW'></input>
          <button className='Login'>Log in</button>
        </div>
      </MainBlockStyle>
    );
  }