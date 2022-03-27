//앱 전체의 Header
import React from 'react'
import { Link } from 'react-router-dom'
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

    /*이미지*/
    img{
      width: 35px;
      height: 35px;
    }

    /*호버*/
    &:hover {
      background-color: white;
      opacity: 0.6;
    }
  }

  div.blank{
    flex-grow: 4;

    /*글씨*/
    padding-top: 5%;
    font-size: 18px;
    color: #002F5A;
    font-weight: bold;

    /*호버*/
    &:hover {
      background-color: white;
      opacity: 0.6;
    }
  }

  div.logo{
    padding-top: 10px;
    flex-grow: 1;
    flex-basis: 7%;
    background-color: white;

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
  `


  return (
    <BackgroundBlock>
      <div className='containerHeader'>
        <div className='logo'>
          <Link to={'/'}>
            <img src={require('../../media/structure/로고.png')} alt='로고' style={{width: "40px", height: "40px"}}/>
          </Link>
        </div>
        <div className='blank'>
          <Link className= 'blank' style={{textDecoration: 'none', color: '#002F5A'}} to={'/'}>
            <span>너의 이중전공은?</span>
          </Link>
        </div>
        <Link style={{textDecoration: 'none' }} to={'/choose'}>
          <div className='menu'><img src={require('../../media/tab/백메뉴.png')} alt='메뉴'/></div>
        </Link>
      </div>
    </BackgroundBlock>
  )
}

