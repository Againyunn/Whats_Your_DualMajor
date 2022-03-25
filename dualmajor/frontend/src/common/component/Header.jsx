//화면의 Header
import React from 'react'
import styled from 'styled-components'

export default function Header() {

  const BackgroundBlock = styled.div`
    div.containerHeader{
      min-height: 2vh;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      background-color: white;
    }

    div.menu{
      flex-basis: 10%;
      flex-grow: 1;
      background-color: white;


    }

    div.blank{
      flex-grow: 5;

      /*글씨*/
      padding-top: 5%;
      padding-left: 15%;
      font-size: 21px;
      color: #002F5A;
      font-weight: bold;
    }
  `


  return (
    <BackgroundBlock>
      <div className='containerHeader'>
        <div className='blank'>너의 이중전공은?</div>
        <div className='menu'><img src={process.env.PUBLIC_URL +`${'/media/structure/메뉴2.jpg'}`} alt='메뉴'></img></div>
      </div>
    </BackgroundBlock>
  )
}
