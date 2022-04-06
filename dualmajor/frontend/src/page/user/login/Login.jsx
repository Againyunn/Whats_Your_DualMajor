//로그인 창
import React from 'react'
import styled from 'styled-components';
import Header from '../../main/component/Header';
import MainBlock from './component/MainBlock';
import OnlyPrevFooter from '../../../common/footer/OnlyPrevFooter'

export default function Login() {
    //메뉴바 노출 상태관리
    const showMenu = false;

    return (
        <>
            <MainBlockStyle>
                <div className="mainContainer">
                    <div className="header"><Header showMenu={showMenu}/></div>
                    <div className='mainBody'><MainBlock/></div>
                    <div className='footer'><OnlyPrevFooter/></div>
                </div>
            </MainBlockStyle>
        </>
      )
    }
    
    const MainBlockStyle = styled.div`
      div.mainContainer{
        display: grid;
        grid-template-rows: 0.9fr 6fr 1fr;
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