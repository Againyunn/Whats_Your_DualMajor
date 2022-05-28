//메인 홈 화면
import {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../main/component/Header";
import Footer from "../main/component/Footer";

import '../../media/css/commonFrame.css';
import { Form, Card, Button,  Modal, Row, Col, Container, ProgressBar, Accordion, ListGroup, ListGroupItem, InputGroup, FormControl} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import RecommendService from "../../services/recommend.service";
import RateService from "../../services/rate.service";

// import Login from "../../../components/Login";

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
        //서울 선택 시
        if(element.target.id === "seoul")
            navigate("/seoulMajorInfo");
    }

    //filter로 전공을 선택하면 해당 전공에 대한 정보 API로 받아오기

    //변수 선언
    const [thisMajorList, setThisMajorList] = useState([{id: "1", name: "2"}]);
    const [selectedMajorId, setSelectedMajorId] = useState("");
    const [majorInfo, setMajorInfo] = useState("");
    const [majorDetailInfo, setMajorDetailInfo] = useState(false);
   

    //API통신 선언
    //처음 화면 랜더링 시 → 각 캠퍼스별 전공리스트 받아오기
    //해당학과에 대한 지원 여부 확인하기
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

        let getData = Object.values(JSON.parse(data));
        setThisMajorList(getData);

        setSelectedMajorId(getData[0].name);

        // RateService.getMajorListGlobal().then(
        //     (response) => {

        //         let getData = Object.values(JSON.parse(response.data.majorListSeoul));
        //         setThisMajorList(getData);
        //         setSelectedMajorId(getData[0].name);
        //         console.log(response.data.majorListSeoul);
        //     }
        // )
    },[])

    // useEffect(() => {
    //     //선택한 적이 있는 지 확인
    //     setSelectedMajorId(thisMajorList);

    // },[thisMajorList])

    //select를 통해 전공을 선택하면 API를 요청
    useEffect(() => {
               //테스트
               let majorData =`[
                {
                    "departmentName": "GBT학부",
                    "campus": "글로벌",
                    "intro": "inf4",
                    "degree": "deg4",
                    "career": "career4",
                    "curriculum": "cur4",
                    "certification": "cer4",
                    "webPage": "www.hufs.ac.kr",
                    "phoneNum": "031-0000-0000"
                }
            ]
        `
        // setMajorInfo(JSON.parse(majorData));
        let allMajorData = JSON.parse(majorData);
        console.log("allMajorData:",allMajorData);
        let targetIndex = allMajorData.findIndex(obj => obj.departmentName == selectedMajorId);
        console.log("targetIndex:",targetIndex);
        setMajorDetailInfo(allMajorData[targetIndex]);

        // setMajorDetailInfo(JSON.parse(majorData));
        
        // RecommendService.getDepartmentInfo(selectedMajorId).then(
        //     (response) => {

        //         //전달받은 값을 데이터로 저장
        //         // setMajorDetailInfo(response.data);

        //         //실행
        //         ShowMajorDetail();
        //     }
        // )


    },[selectedMajorId])

    useEffect(() =>{
        ShowMajorDetail();
    },[majorDetailInfo])


    //정보를 확인해볼 전공 확인 함수
    const SelectMajorId = (e) =>{
        setSelectedMajorId(e.target.value);
    }

    const ShowMajorDetail = () => {
        console.log('thisResult:',majorDetailInfo);
        console.log('testData.list.academicName:',majorDetailInfo);

        if(!majorDetailInfo){
            return(
                <></>
            );
        }

        return(
            <>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{majorDetailInfo.departmentName}</Card.Title>
                    <Card.Text>
                    {majorDetailInfo.intro}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{majorDetailInfo.campus}</ListGroupItem>
                    <ListGroupItem>{majorDetailInfo.degree}</ListGroupItem>
                    {
                        (majorDetailInfo.career !== null)?
                        <ListGroupItem>{majorDetailInfo.career}</ListGroupItem>:
                        <></>
                    }
                    {
                        (majorDetailInfo.curriculum !== null)?
                            <ListGroupItem>{majorDetailInfo.curriculum}</ListGroupItem>:
                            <></>
                    }
                    {
                        (majorDetailInfo.certification!== null)?
                        <ListGroupItem>{majorDetailInfo.certification}</ListGroupItem>:
                        <></>                                                   
                    }
                    {
                        (majorDetailInfo.webPage !== null)?
                        <ListGroupItem>{majorDetailInfo.webPage}</ListGroupItem>:
                        <></>
                    }
                    {
                        (majorDetailInfo.phoneNum !== null)?
                        <ListGroupItem>{majorDetailInfo.phoneNum}</ListGroupItem>:
                        <></>
                    }
                </ListGroup>
                </Card>
            </>
        )
    }

    //선택한 전공정보 쿠키로 저장
    const saveMajorDetailInfo = () => {

        //로컬에 기존의 majorDetailInfo가 있는 지 확인
        let preMajorDetailInfo = localStorage.getItem("majorDetailInfo");

        //기존에 저장내역이 없는 경우
        if(!preMajorDetailInfo){
            //로컬스토리지 생성
            localStorage.setItem("majorDetailInfo",`${selectedMajorId}`);
        }
        //기존에 저장내역이 있는 경우
        else{
            
            let preMajorDetailInfoArr = preMajorDetailInfo.split('/');
            let updateMajorDetailInfo = preMajorDetailInfoArr[0];

            for(var i = 1; i < preMajorDetailInfoArr.length; i++){
                updateMajorDetailInfo += `${preMajorDetailInfoArr[i]}`;
            }

            localStorage.setItem("majorDetailInfo", updateMajorDetailInfo);
        }    
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
                                <ShowMajorDetail/>
                            </div>
                            <div className="applyBlock">                
                                <Button type="button" className="applyButton" onClick={saveMajorDetailInfo}>저장하기</Button>
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
        background-color: #875100;
        opacity: 0.57;
    }

    .selectGlobal{
        flex-grow: 1;
        padding: 5px;
        background-color: #875100;
        opacity: 0.8;
    }

    .selectSeoul:hover{
        opacity: 0.8;
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

        .noticeAvgGpa{
            color: #028799;
            opacity:0.9;

            font-size: 12px;
        }
    }



    /*선택 및 지원*/
    .applyBlock{
        grid-row-start:4;
        grid-row-end:5;
        // grid-template-rows: repeat(auto-fit, minmax(300px, auto));

        font-weight: bold;
        font-size: 18px;

        
        //가운데 정렬용 선언
        // display: flex;
        justify-content: center;
        align-items: center;

        // padding-top: 5%;

        .warning{
            font-size: 10px;
        }

        .applyButton{

            background-color: #875100;
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
                background-color: #875100;
                opacity: 0.9;
            }
        }

        .appliedButton{
            
            // background-color: #875100;
            // opacity: 0.8;
        
            /*모양*/
            border-radius: 5px;
            width: 40%;
        
            /*글씨*/
            font-size: 14px;
            color: white;
            font-weight: bold;
    
            // /*호버*/
            // &:hover {
            //     background-color: #875100;
            //     opacity: 0.9;
            // }
        }
    }

    #applyButton{

        background-color: #875100;
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
            background-color: #875100;
            opacity: 0.9;
        }
    }
`    