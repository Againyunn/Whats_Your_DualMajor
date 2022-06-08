//메인 홈 화면
import {useState, useEffect} from "react";
// import axios from "axios";
import styled from "styled-components";
import Header from "../../main/component/Header";
import Footer from "../../main/component/Footer";

import '../../../media/css/commonFrame.css';
// import MainFrame from "../MainFrame";
// import FilterMajor from "../component/FilterMajor";
import { Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import RateService from '../../../services/rate.service';

import GPAChart from '../component/GPAChart'
import ApplyChart from "../component/ApplyChart";
import Swal from 'sweetalert2'   

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
        //글로벌 선택 시
        if(element.target.id === "global")
            navigate("/global");
    }

    //filter로 전공을 선택하면 해당 전공에 대한 정보 API로 받아오기

    //변수 선언
    const [thisMajorList, setThisMajorList] = useState([{id: "1", name: ""}]);
    const [selectedMajorId, setSelectedMajorId] = useState("");
    const [majorInfo, setMajorInfo] = useState("");

    //로그인 여부 확인(기본 값: 로그인 false)
    const [login, setLogin] = useState(false);
    const [thisUser, setThisUser] = useState('');

    //지원 여부 확인(기본 값: API통해서 받아오기)
    const [applyInfo, setApplyInfo] = useState(false); //stdNum: 학번, apply: boolean, majorName: DB내의 학과명, gpa: 학점정보, change: boolean
    const [thisApply, setThisApply] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [valid, setValid] = useState(true);

    //학점 정보 받아오기
    const [showModal, setShowModal] = useState(false);
    const [thisGpa, setThisGpa] = useState("");

    //API통신 선언
    //처음 화면 랜더링 시 → 각 캠퍼스별 전공리스트 받아오기
    //해당학과에 대한 지원 여부 확인하기
    useEffect(() => {

        // //테스트용
        // console.log("rendering")
        // let data = `
        //     [
        //         {
        //             "id": "1",
        //             "name": "GBT학부"
        //         },
        //         {
        //             "id": "2",
        //             "name": "컴퓨터공학부"
        //         },
        //         {
        //             "id": "3",
        //             "name": "세르비아크로아티아어과"
        //         },
        //         {
        //             "id": "4",
        //             "name": "브라질학과"
        //         }
        //     ]
        // `
        // setThisMajorList(Object.values(JSON.parse(data)));
        let majorFirstSetting = '';
        RateService.getMajorListSeoul().then(
            (response) => {
                let getData = response.data.majorListSeoul;
                setThisMajorList(getData);
                setSelectedMajorId(getData[0].name);
                // console.log(response.data.majorListSeoul);

                majorFirstSetting = getData[0].name;
            }
        )

        //로그인 되어있는 지 확인
        //로그인 되어 있는 경우
        if(sessionStorage.getItem("user")!==null && sessionStorage.getItem("user")!==undefined){
            let tmp = Object.values(JSON.parse(sessionStorage.getItem("user")));
            // console.log("sessionLog:", tmp);
            let userId = tmp[0];
            setThisUser(userId);
            setLogin(true); 

            // console.log("user id:", userId);

            //06.01 수정
            //사용자의 지원 여부 정보 받아오기
            RateService.getApplyInfo(userId).then(
                (response) =>{
                    //API의 데이터 형식 stdNum: 학번, apply: boolean, majorName: DB내의 학과명, gpa: 학점정보, change: boolean
                    setApplyInfo(response.data);
                    setThisApply(response.data.apply);
                    setValid(response.data.change);
                    // console.log("applyInfo data:", response.data);

                    if(response.data.apply == true && response.data.majorName == majorFirstSetting){
                        // 사용자의 지원 정보가 있는 경우
                        setSelectedMajorId(response.data.majorName);
                    }
                    
                }
            )
        }
        //로그인이 안된 경우
        else{
            setLogin(false);
        }

    },[])

    // useEffect(() => {
    //     //major정보 초기화 or major를 선택한 경우
    //     if(login){ //&& (!selectedMajorId == false)){
    //         //사용자의 지원 여부 정보 받아오기
    //         RateService.getApplyInfo(thisUser).then(
    //             (response) =>{
    //                 //API의 데이터 형식 stdNum: 학번, apply: boolean, majorName: DB내의 학과명, gpa: 학점정보, change: boolean
    //                 setApplyInfo(response.data);
    //                 setThisApply(response.data.apply);
    //                 console.log("applyInfo data:", response.data);
    //             }
    //         )
    //     }

    //     //로그인 o and 사용자의 지원 정보가 있는 경우
    //     if(login && applyInfo[2]!== null){
    //         setSelectedMajorId(applyInfo[2]);
    //     }
    //     //둘 다 해당 x인 경우
    //     else{
    //         setSelectedMajorId(thisMajorList[0].name);
    //     }

    // },[thisMajorList])

    //select를 통해 전공을 선택하면 API를 요청
    useEffect(() => {
        // //테스트
        // let majorData =`
        //     {
        //         "id" : "1",
        //         "name" : "GBT학부",
        //         "applyNum" : "25",
        //         "totalNum" : "100",
        //         "avgGpa" : "4.05"
        //     }
        // `
        // setMajorInfo(JSON.parse(majorData));

        if(selectedMajorId){
            RateService.getRateInfo(selectedMajorId).then(
                (response) => {
                    setMajorInfo(response.data);
    
                    // console.log("getRateInfo:", response.data);
                }
            )
        }

        //로그인 되어있는 지 확인
        //로그인 되어 있는 경우
        if(sessionStorage.getItem("user")!==null && sessionStorage.getItem("user")!==undefined){
            let tmp = Object.values(JSON.parse(sessionStorage.getItem("user")));
            //   console.log("sessionLog:", tmp);
              let userId = tmp[0];
            setThisUser(userId);
            setLogin(true); 

            // console.log("user id:", userId);
            //06.01 수정
            //사용자의 지원 여부 정보 받아오기
            RateService.getApplyInfo(userId).then(
                (response) =>{
                    //API의 데이터 형식 stdNum: 학번, apply: boolean, majorName: DB내의 학과명, gpa: 학점정보, change: boolean
                    setApplyInfo(response.data);

                    //현재 선택된 전공이 지원자가 지원한 전공인 경우
                    if(selectedMajorId == response.data.majorName){
                        
                        setThisApply(response.data.apply);
                        setValid(response.data.change);
                        // console.log("applyInfo data:", response.data);
    
                        if(response.data.apply == true){
                            // 사용자의 지원 정보가 있는 경우
                            setSelectedMajorId(response.data.majorName);
                        }
                    }
                  
                    
                }
            )
        }
        //로그인이 안된 경우
        else{
            setLogin(false);
        }

    },[selectedMajorId])

    //사용자가 지원한 정보 백엔드로 전송
    useEffect(() => {
        //로그인 & thisApply === true인 경우
        if(login && (thisApply == true) && (clicked === true)){
            RateService.postApply(thisUser, selectedMajorId, thisApply).then(
                (response) =>{
                    // console.log("post selectedMajorId:", selectedMajorId);
                    // console.log("user id:", thisUser);
                    
                    Swal.fire({
                        text: `${selectedMajorId}에 지원했어요😉`,
                        icon: undefined,
                        showConfirmButton: false,
                      });

                      window.location.reload();
                }
            ).catch(
                (error)=>{
                    // console.log("postApply:",error);
                }
            )
        }
        //지원 취소
        if(login && (thisApply == false) && (clicked === true)){
            RateService.postApply(thisUser, applyInfo.majorName, thisApply).then(
                (response) =>{
                    // console.log("post selectedMajorId:", applyInfo.majorName);
                    // console.log("user id:", thisUser);
                    
                    Swal.fire({
                      text: `${applyInfo.majorName}에 지원취소했어요😀`,
                      icon: undefined,
                      showConfirmButton: false,
                    });

                    window.location.reload();
                }
            ).catch(
                (error)=>{
                    // console.log("postApply:",error);
                }
            )
        }

        //지원하기 버튼 비활성화로 변경
        setClicked(false);

            //로그인 되어있는 지 확인
        //로그인 되어 있는 경우
        if(sessionStorage.getItem("user")!==null && sessionStorage.getItem("user")!==undefined){
            let tmp = Object.values(JSON.parse(sessionStorage.getItem("user")));
            // console.log("sessionLog:", tmp);
            let userId = tmp[0];
            setThisUser(userId);
            setLogin(true); 

            // console.log("user id:", userId);
            //06.01 수정
            //사용자의 지원 여부 정보 받아오기
            RateService.getApplyInfo(userId).then(
                (response) =>{
                    //API의 데이터 형식 stdNum: 학번, apply: boolean, majorName: DB내의 학과명, gpa: 학점정보, change: boolean
                    setApplyInfo(response.data);
                    
                    //현재 선택된 전공이 지원자가 지원한 전공인 경우
                    if(selectedMajorId == response.data.majorName){
                        
                        setThisApply(response.data.apply);
                        setValid(response.data.change);
                        // console.log("applyInfo data:", response.data);

                        if(response.data.apply == true){
                            // 사용자의 지원 정보가 있는 경우
                            setSelectedMajorId(response.data.majorName);
                        }
                    }
                        
                }
            )
        }
        //로그인이 안된 경우
        else{
            setLogin(false);
        }
    },[clicked])//thisApply

    //정보를 확인해볼 전공 확인 함수
    const SelectMajorId = (e) =>{
        setSelectedMajorId(e.target.value);
        // console.log("selectedMajorId:", e.target.value) ;
    }

    //지원 버튼 선택 시
    const applyMajor = () => {
        //로그인 유무 확인
        if(!login){
            //Login()
            Swal.fire({
                text: "로그인 후 이용해주세요~",
                icon: undefined,
                confirmButtonText: '확인',
                confirmButtonColor: '#002F5A'
              });
            return;
        }

        setThisApply(true);
        setClicked(true);
        //모달창 열어서 GPA입력 받기
        // modalShow();
    }

    //지원취소 시
    const cancelApplyMajor = () =>{
        //지원정보 초기화(default => false)
        setThisApply(false);
        setClicked(true);

    }

    //학점 입력받을 모달 제어
    const modalClose = () => setShowModal(false);
    const modalShow = () => setShowModal(true);

    //학점정보 받아오기
    const putGpa = (e)=> {
        //학점정보 업데이트
        setThisGpa(e.target.value);   
            
    }

    const postApplyInfo = () => {
        //지원하기 버튼을 누른 majorName을 thisApply에 업데이트
        // setThisApply(true);
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
                                        {
                                            !majorInfo.totalNum?
                                            <div className="noticeApply">인원 제한이 없는 학과입니다.<br/></div>:
                                            <ApplyChart majorName={selectedMajorId} applyNum={majorInfo.applyNum} totalNum={majorInfo.totalNum} />
                                        }                                        
                                        {   
                                            //로그인 여부 & 지원여부 검증 
                                            login && thisApply == true && selectedMajorId == applyInfo.majorName?
                                            <GPAChart majorName={selectedMajorId} averageGPA={majorInfo.avgGpa}/>:
                                            <>
                                                <GPAChart majorName={"false"} averageGPA={majorInfo.avgGpa}/>
                                                <div className="noticeAvgGpa" >평균학점은 지원 후 확인할 수 있습니다😊</div>
                                            </>
                                        }
                                    </>
                                }
                            </div>
                            <div className="applyBlock">
                            {
                                    login?
                                    <>
                                    {
                                        thisApply == false && applyInfo.majorName != selectedMajorId?
                                        <Button type="button" className="applyButton" onClick={applyMajor}>지원하기</Button>:
                                        <>
                                        {
                                            valid == false?
                                            <>
                                             <OverlayTrigger
                                                key='wait'
                                                placement='top'
                                                overlay={
                                                    <Tooltip id="wait">
                                                    <strong>지원 후 6시간 뒤에 취소가능해요.</strong><br/>
                                                    <span>조금만 더 기다려주세요😉</span>
                                                    </Tooltip>
                                                }
                                                >
                                                    <div>
                                                        <Button type="button"  className="appliedButton" variant="secondary"  disabled>지원취소</Button>
                                                        <br/>
                                                        <small>{applyInfo.majorName}에 지원한 상태입니다.<br/>복수지원은 불가하니 양해부탁드려요😥</small>    
                                                    </div>
                                                </OverlayTrigger>
                                                
                                            </>:
                                            <>
                                                <Button type="button" className="appliedButton" variant="secondary" onClick={cancelApplyMajor}>지원취소</Button>
                                                <br/>
                                                <small>{applyInfo.majorName}에 지원한 상태입니다.<br/>지원취소 후 변경 가능해요.</small><br/>
                                            </>
                                        }   
                                            
                                        </>
                                    }
                                    </>:
                                    <>
                                    <span className="warning">지원하기 전, 로그인해주세요😊</span><br/>
                                    <Button type="button" className="applyButton" onClick={()=>navigate("/login")}>Login</Button>
                                    </>
                                   
                                }

                                
                                
                            </div>
                        </div>
                    </BodyBlock>
                <div className="footer"><Footer showPrev={showPrev} showNext={showNext} showDev={showDev}/></div>
            </div>
            <>
                <Modal show={showModal} onHide={modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>{selectedMajorId} 지원하기</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>나의 평균 학점</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="학점을 입력해주세요."
                        value={thisGpa}
                        onChange={putGpa}
                        autoFocus
                        />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalClose}>
                    취소
                    </Button>
                    <Button variant="dark" onClick={postApplyInfo}>
                    입력하기
                    </Button>
                    
                </Modal.Footer>
                </Modal>
            </>
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

        .noticeApply{
            color: #002F5A;
            opacity:0.8;

            font-size: 13px;
        }

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

        .appliedButton{
            
            // background-color: #002F5A;
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
            //     background-color: #002F5A;
            //     opacity: 0.9;
            // }
        }
    }

    #applyButton{

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
`    