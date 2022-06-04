//로그인 or 회원가입 선택 박스
import React from 'react'
import { Link } from 'react-router-dom'
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
    grid-template-rows: 3fr 1fr 0.2fr 1fr 3fr;
    background-color: white;
    text-align: center;

    row-gap: 10px;
    
    height: 75vh;
    width: 45vh;
  }

  /*로그인*/
  div.login{
    /*레이아웃*/
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;



    /*색*/
    background-color: #002F5A;
    opacity: 0.8;

    /*모양*/
    margin-right: 5px;
    border-radius: 10px;

    /*글씨*/
    padding-top: 10%;
    font-size: 19.5px;
    color: white;
    font-weight: bold;

    /*호버*/
    &:hover {
      background-color: #002F5A;
      opacity: 0.9;
    }
  }

  /*회원가입*/
  div.signUp{
    /*레이아웃*/
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;



    /*색*/
    background-color: #028799;
    opacity: 0.9;

    /*모양*/
    margin-right: 5px;
    border-radius: 10px;

    /*글씨*/
    padding-top: 10%;
    font-size: 19.5px;
    color: white;
    font-weight: bold;

    /*호버*/
    &:hover {
      background-color: #028799;
      opacity: 1;
    }

  }

`
  function BodyBlock(){
    return(
      <MainBlockStyle>
        <div className='container'>
          <div className='login'>
            <Link to={{ pathname:'/login', state: { from: '/'}}} style={{textDecoration: 'none', color: 'white'}}>
              Log in
            </Link>
          </div>
          <div className='signUp'>
          <Link to={{ pathname:'/signup', state: { from: '/'}}} style={{textDecoration: 'none', color: 'white'}}>
            Sign up
          </Link>
          </div>
        </div>
      </MainBlockStyle>
    );
  }