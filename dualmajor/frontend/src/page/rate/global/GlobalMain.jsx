//메인 홈 화면
import {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../../main/component/Header";
import Footer from "../../main/component/Footer";

import '../../../media/css/commonFrame.css';
import MainFrame from "../MainFrame";
import FilterMajor from "../component/FilterMajor";
import { Button, Col, Container, Row, ProgressBar,Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import RateService from '../../../services/rate.service';

function GlobalMain() {
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
        if(element.target.id === "seoul")
            navigate("/seoul");
    }

    //filter로 전공을 선택하면 해당 전공에 대한 정보 API로 받아오기

    //변수 선언
    const [thisMajorList, setThisMajorList] = useState([{id: "1", name: "2"}]);
    const [selectedMajorId, setSelectedMajorId] = useState("");
    const [majorInfo, setMajorInfo] = useState("");

    //API통신 선언
    //처음 화면 랜더링 시 → 각 캠퍼스별 전공리스트 받아오기
    useEffect(() => {

        //테스트용
        console.log("rendering")
        let data = `
            [
                {
                    "id": "1",
                    "name": "GBT학부"
                },
                {
                    "id": "2",
                    "name": "컴퓨터공학부"
                },
                {
                    "id": "3",
                    "name": "세르비아크로아티아어과"
                },
                {
                    "id": "4",
                    "name": "브라질학과"
                }
            ]
        `
        setThisMajorList(Object.values(JSON.parse(data)));

        //     RateService.getMajorListGlobal().then(
        //         (response) => {
        //             setThisMajorList(Object.values(JSON.parse(response.data.majorListSeoul)));
        //         }
        //     )

    },[])

    useEffect(() => {
        setSelectedMajorId(thisMajorList[0].name);
    },[thisMajorList])

    //select를 통해 전공을 선택하면 API를 요청
    useEffect(() => {
        //테스트
        let majorData =`
            {
                "id" : "1",
                "name" : "GBT학부",
                "applyNum" : "25",
                "totalNum" : "100",
                "avgGpa" : "4.05"
            }
        `
        setMajorInfo(JSON.parse(majorData));


        // RateService.getRateInfo(selectedMajorId).then(
        //     (response) => {
        //         setMajorInfo(JSON.parse(response));
        //     }
        // )


    },[selectedMajorId])
    

    //정보를 확인해볼 전공 확인 함수
    const SelectMajorId = (e) =>{
        setSelectedMajorId(e.target.value);
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
                              <Form.Select onChange={SelectMajorId}>
                                {
                                    !thisMajorList?  
                                    <option value="0">학과 없음</option>:
                                    thisMajorList.map(thisMajor => (
                                        <option key={thisMajor.name} value={thisMajor.name}>
                                        {thisMajor.name}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </div>
                        <div className="majorBlock">
                            {
                                !majorInfo?
                                <></>:
                                <>
                                    <span>{majorInfo.applyNum}</span><br/>
                                    <span>{majorInfo.totalNum}</span><br/>
                                    <span>{majorInfo.avgGpa}</span>
                                </>
                            }
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
export default GlobalMain;

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
        opacity: 0.7;
    }

    .selectGlobal{
        flex-grow: 1;
        padding: 5px;
        background-color: #028799;
        opacity: 1;
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