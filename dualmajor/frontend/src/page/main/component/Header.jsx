//메인 화면의 header (메뉴 버튼 있음)
import React from 'react'
import styled from 'styled-components'

export default function Header() {

  const BackgroundBlock = styled.div`
    div.containerHeader{
      min-height: 5vh;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      background-color: white;

      
      padding-bottom: 15px;
      border-bottom: solid 2px #002F5A;
    }

    div.menu{
      padding-top: 10px;
      flex-basis: 10%;
      flex-grow: 1;
      background-color: white;

      /*메뉴 호버*/
      &:hover {
          background-color: #A7A7A7;
          /*opacity: 0.67;*/
        }
    }

    div.blank{
      flex-grow: 5;

      /*글씨*/
      padding-top: 5%;
      font-size: 18px;
      color: #002F5A;
      font-weight: bold;
    }

    div.logo{
      padding-top: 10px;
      flex-grow: 1;
      flex-basis: 7%;
      background-color: white;
    }
  `


  return (
    <BackgroundBlock>
      <div className='containerHeader'>
        <div className='logo'><img src={require('../../../media/structure/로고.png')} alt='로고' style={{width:'35px', height:'35px'}}/></div>
        <div className='blank'>너의 이중전공은?</div>
        <div className='menu'><img src={require('../../../media/tab/메뉴.png')} alt='메뉴' style={{width:'35px', height:'px'}}/></div>
      </div>
    </BackgroundBlock>
  )
}



// ={process.env.PUBLIC_URL +`${'/media/structure/메뉴2.jpg'}`