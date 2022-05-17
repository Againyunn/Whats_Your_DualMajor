//메인 홈 화면
import {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../../main/component/Header";
import Footer from "../../main/component/Footer";

import '../../../media/css/commonFrame.css';
import MainFrame from "../MainFrame";
import FilterMajor from "../component/FilterMajor";
import { Button, Col, Container, Row, ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function SeoulMain() {
    //상단바 컨트롤 : 메뉴바 노출 상태관리
    const showMenu = false;

    //하단바 컨트롤 
    const showPrev = true;
    const showNext = false;
    const showDev = false;

    //이동 제어
    let navigate = useNavigate();

    //서울, 글로벌 선택 함수
    const selectCampus = (element) => {
        //글로벌 선택 시
        if(element.target.id === "global")
            navigate("/global");
    }


    return (
        <>
        <div className="mainContainer">
            <div className="header"><Header showMenu={showMenu}/></div>
                <BodyBlock className="mainBody">
                    <div className='container'>
                        <div className="selectCampus">
                            <div className="selectFlex">
                                <div className="selectSeoul" id="seoul" onClick={selectCampus}>서울</div>
                                <div className="selectGlobal" id="global" onClick={selectCampus}>글로벌</div>
                            </div>
                        </div>
                        <div className="filterBlock">
                            <FilterMajor campus={"seoul"}/>
                        </div>
                        <div className="majorBlock">

                        </div>
                        <div className="applyBlock">
                            <Button type="button" className="applyButton">지원하기</Button>
                        </div>
                    </div>
                </BodyBlock>
            <div className="footer"><Footer showPrev={showPrev} showNext={showNext} showDev={showDev}/></div>
        </div>
        </>
    );
    }
export default SeoulMain;

//CSS
const BodyBlock = styled.div`
    .container{
        display: grid;
        grid-template-rows: 1fr 1fr 5fr 1fr;
        background-color: white;
        text-align: center;
        /*justify-content: center;*/
        
        
        vertical-align: middle;
        row-gap: 10px;

        height: 70vh;
        width: 45vh;
    }
    

    /*캠퍼스 선택*/
    .selectCampus{
        grid-row-start: 1;
        grid-row-end: 2;

        font-weight: bold;
        font-size: 18px;

    }

    /*flex block설정*/
    .selectFlex{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: stretch;
        
        color: white;
    }

    .selectSeoul{
        flex-grow: 1;
        padding: 5px;
        background-color: #028799;
        opacity: 1;
    }

    .selectGlobal{
        flex-grow: 1;
        padding: 5px;
        background-color: #028799;
        opacity: 0.7;
    }

    .selectGlobal:hover{
        opacity: 1;
    }


    /*전공 선택 필터*/
    .filterBlock{
        grid-row-start: 2;
        grid-row-end: 3;

        font-weight: normal;
        font-size: 15px;
    }

    /*정보 랜더링*/
    .majorBlock{
        grid-row-start: 3;
        grid-row-end: 4;

        border: 1px solid #C4C4C4;
    }



    /*선택 및 지원*/
    .applyBlock{
        grid-row-start:4;
        grid-row-end:5;
        // grid-template-rows: repeat(auto-fit, minmax(300px, auto));

        font-weight: bold;
        font-size: 18px;

        
        //가운데 정렬용 선언
        display: flex;
        justify-content: center;
        align-items: center;

        // padding-top: 5%;

        .applyButton{

            background-color: #002F5A;
            opacity: 0.8;
        
            /*모양*/
            border-radius: 5px;
            width: 40%;
        
            /*글씨*/
            font-size: 14px;
            color: white;
            font-weight: bold;
    
            /*호버*/
            &:hover {
                background-color: #002F5A;
                opacity: 0.9;
            }
        }
    }
`    