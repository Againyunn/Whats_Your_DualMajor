//메인 화면의 footer (기획, 개발자 명과 문의 시 이메일)
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

    div.title{
      flex-basis: 10%;
      flex-grow: 2;
      background-color: white;

      /*글씨*/
      padding-right:10px;
      text-align: right;
      font-size: 11.5px;
      color: #002F5A;
      font-weight: bold;
    }

    div.content{
      flex-grow: 5;


      /*글씨*/
      text-align: left;
      font-size: 11.5px;
      color: #002F5A;
      font-weight: normal;
    }
  `


  return (
    <BackgroundBlock>
      <div className='containerHeader'>
        <div className='title'><span><b>◽기획/개발:</b></span><br/><br/><span><b>◽문의:</b></span></div>
        <div className='content'><span>박동렬, 류승기, 정재윤, 최중원</span><br/><br/><span>rangyun36@gmail.com</span></div>
      </div>
      
    </BackgroundBlock>
  )
}
