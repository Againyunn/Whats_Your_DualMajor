//앱 전체의 footer
import React from 'react'
import styled from 'styled-components'

export default function Footer() {

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

    div.menu{
      flex-basis: 10%;
      flex-grow: 2;
      background-color: white;

      /*글씨*/
      padding-right:10px;
      text-align: right;
      font-size: 8px;
      color: #002F5A;
      font-weight: bold;
    }

    div.blank{
      flex-grow: 5;


      /*글씨*/
      text-align: left;
      font-size: 8px;
      color: #002F5A;
      font-weight: normal;
    }
  `


  return (
    <BackgroundBlock>
      <div className='containerHeader'>
        <div className='menu'><span>기획/개발:</span><br/><span>문의:</span></div>
        <div className='blank'><span>박동렬, 류승기, 정재윤, 최중원</span><br/><span>rangyun36@gmail.com</span></div>
      </div>
      
    </BackgroundBlock>
  )
}
