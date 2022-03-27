//앱 전체의 footer: "이전" "홈" "이후" 3가지 모두 존재
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function NotNextFooter() {

  const BackgroundBlock = styled.div`
  div.containerHeader{

    /*min-height: 5vh;*/
    margin-top: 20px;
    border-top: solid 2px #002F5A;
    padding-top: 10px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: white;

    z-index: 1;
  }

  div.prev{

    flex-grow: 0.5;
    background-color: white;
    text-align: left;

    /*글씨*/
    text-align: right;
    font-size: 8px;
    color: #002F5A;
    font-weight: bold;

    /*이미지 처리*/
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

  div.home{
    flex-grow: 8;


    /*글씨*/
    text-align: center;
    font-size: 8px;
    color: #002F5A;
    font-weight: normal;

    /*이미지 처리*/
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

  div.next{

    flex-grow: 0.5;


    /*글씨*/
    text-align: left;
    font-size: 8px;
    color: #002F5A;
    font-weight: normal;

    /*이미지 처리*/
    img{
      width: 40px;
      height: 40px;
    }
  }
`


  return (
    <BackgroundBlock>
      <div className='containerHeader'>
        <div className='prev' onClick={() => { window.history.back(); }}><img src={require('../../media/tab/이전.png')} alt="이전"/></div>
        <div className='home'>
          <Link to={'/'}>
            <img src={require('../../media/tab/홈.png')} alt="이전"/>
          </Link>
        </div>
        <div className='next'></div>
      </div>
      
    </BackgroundBlock>
  )
}
