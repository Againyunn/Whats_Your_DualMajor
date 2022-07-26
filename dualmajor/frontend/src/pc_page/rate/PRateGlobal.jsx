import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
//내 정보 Modal
import MyModal from '../../page/main/component/MyModal';
//부트스트랩
import {Button,Form,Modal,OverlayTrigger,Tooltip,DropdownButton,Dropdown} from 'react-bootstrap';
//그래프 컴포넌트
import GPAChart from '../../page/rate/component/GPAChart'
import ApplyChart from "../../page/rate/component/ApplyChart";
//API
import RateService from '../../services/rate.service';
//팝업
import Swal from 'sweetalert2' 
// 스타일
import "../main/PMainHeader.css";
import "../main/PMainFrame.css";
import "./PRateStyle.css";

function PRateMain(){
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(false);
    const [predictedRate, setPredictedRate] = useState(true);
    const [majorInfoTab, setMajorInfoTab] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

    /**전공 지원 및 경쟁률 관련 상태관리 */

    //변수 선언
    const [thisMajorList, setThisMajorList] = useState([{id: "1", name: ""}]);
    const [selectedMajorId, setSelectedMajorId] = useState("");
    const [majorInfo, setMajorInfo] = useState("");

    //로그인 여부 확인(기본 값: 로그인 false)
    const [login, setLogin] = useState(false);
    const [thisUser, setThisUser] = useState('');

    const [modalShow, setModalShow] = useState(false); //모달을 통해 유저 정보 화면에 랜더링

    //지원 여부 확인(기본 값: API통해서 받아오기)
    const [applyInfo, setApplyInfo] = useState(false); //stdNum: 학번, apply: boolean, majorName: DB내의 학과명, gpa: 학점정보, change: boolean
    const [thisApply, setThisApply] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [valid, setValid] = useState(true);

    //학점 정보 받아오기
    const [showModal, setShowModal] = useState(false);
    const [thisGpa, setThisGpa] = useState("");

    /**반응형 상태관리 */
    const [screenSize, setScreenSize] = useState(1000);

    // 페이지 이동 컨트롤
    let navigate = useNavigate();

    /**브라우저 창 크기 구하는 함수 */
    const getScreenSize = () => {
        let size = window.innerWidth;
        setScreenSize(size);
        return size;
      }

    /**헤더 탭 제어 기능 */
    //선택한 탭에 대한 동작 제어
    const handleSelectService = (type, state) => {
        
        //어떤 유형의 서비스를 선택했는 지 식별
        if(!type){
            resetSelectedTab();
        }
        else if(type === "r"){
            showPageMovePopUp("이중전공 추천 서비스","/recommend");
        }
        else if(type === "p"){
            // showPageMovePopUp("예상경쟁률 서비스","/rate");
        }
        else if(type === "m"){
            showPageMovePopUp("학과정보 조회 서비스","/seoulMajorInfo");
        }
        else if(type === "i"){
            showPageMovePopUp("서비스 소개");
        }
    }

    //각 탭별 바 표시 css변경을 위한 상태관리
    const resetSelectedTab = () =>{
        setRecommandService(false);
        setPredictedRate(false);
        setMajorInfoTab(false);
        setServiceIntro(false);        
    }

    /**페이지 이동 경고 팝업 표시 */
    const showPageMovePopUp = (type, url="/") =>{
      Swal.fire({
        text: `"${type}"(으)로 이동하시겠습니까?`,
        icon: undefined,
        confirmButtonText: '확인',
        confirmButtonColor: '#145f7a',
        showCancelButton: true,
        cancelButtonText: '취소'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate(url)
        } else if (result.isDenied) {
          return
        }
      });
    }

    /**캠퍼스별 페이지 이동(상단의 버튼탭 통해서) */
    //서울, 글로벌 선택 함수
    const selectCampus = (element) => {
        //글로벌 선택 시
        if(element.target.id === "seoul")
            navigate("/rate/seoul");
    }

    /**페이지 랜더링 */
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

        //브라우저 사이즈 구하기
        getScreenSize();

        let majorFirstSetting = '';
        RateService.getMajorListGlobal().then(
            (response) => {
                let getData = response.data.majorListGlobal;
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

    /**특정 전공에 대한 사용자의 기 지원 여부 식별 & 데이터 반환 API */
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

    /**사용자가 특정학과에 지원했다는 API */
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

    /**사용자와 선택된 전공간의 관계(지원여부)를 불러오기 위한 상태값 변경 */
    //정보를 확인해볼 전공 확인 함수
    const SelectMajorId = (e) =>{
        setSelectedMajorId(e.target.value);
        // console.log("selectedMajorId:", e.target.value) ;
    }

    /**지원버튼 선택 시  상태값 변경*/
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

    /**지원취소 시 상태값 변경 */
    const cancelApplyMajor = () =>{
        //지원정보 초기화(default => false)
        setThisApply(false);
        setClicked(true);

    }

    return (
        <div>
            {/* Header */}
            <div className='main-header'>
                <div className='main-icon' onClick={()=>navigate('/')}>
                    <img id='hufs-icon-white'src={require('../../media/main/외대마크(흰색).gif')} alt="외대 마크"/>
                    <span id='main-name'>너의 이중전공은?</span>
                </div>
                  {
                    screenSize > 480?
                    <div className='main-select-service-wrap'>
                    {
                        !recommandService?
                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('r', true)}>이중전공추천</span>
                        </div>:
                        <div className='selected-main-select-service'>
                            <span onClick={()=>handleSelectService('r', false)}>이중전공추천</span>
                        </div>
                    }

                    {
                        !predictedRate?
                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('p', true)}>예상경쟁률</span>
                        </div>:
                        <div className='selected-main-select-service'>
                            <span onClick={()=>handleSelectService('p', false)}>예상경쟁률</span>
                        </div>
                    }

                    {
                        !majorInfoTab?
                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('m', true)}>전공정보</span>
                        </div>:
                        <div className='selected-main-select-service'>
                            <span onClick={()=>handleSelectService('m', false)}>전공정보</span>
                        </div>
                    }

                    {
                        !serviceIntro?
                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('i', true)}>서비스 소개</span>
                        </div>:
                        <div className='selected-main-select-service'>
                            <span onClick={()=>handleSelectService('i', false)}>서비스 소개</span>
                        </div>
                    }
                    </div>:
                    <div>
                      <DropdownButton variant='outline-light' size="sm" className="menu-dropdown-btn" title="메뉴">
                        <Dropdown.Item onClick={()=>handleSelectService('r', true)}>이중전공추천</Dropdown.Item>
                        <Dropdown.Item onClick={()=>handleSelectService('p', true)}>예상경쟁률</Dropdown.Item>
                        <Dropdown.Item onClick={()=>handleSelectService('m', true)}>전공정보</Dropdown.Item>
                        <Dropdown.Item onClick={()=>handleSelectService('i', true)}>서비스 소개</Dropdown.Item>
                      </DropdownButton>
                    </div>
                  }
                <div className='login-wrap'>
                    {/* 로그인 관련 처리 로직*/}
                    {
                      login === false ?
                      <div className='login-tab' onClick={()=>navigate('/login')}>로그인</div>
                      :
                      <div className='menu-tab' onClick={()=> setModalShow(true)}>
                        <img src={require('../../media/tab/백메뉴.png')} alt='메뉴'/>
                      </div>
                    }
                </div>
            </div>
            {/* //Header */}

            {/* Main */}
            <div className='common-rate-main-wrap'>
                <div className="common-select-campus-wrap">
                    <div className="common-select-flex-container">
                        <div className="global-select-seoul-campus" id="seoul" onClick={selectCampus}>서울</div>
                        <div className="global-select-global-campus" id="global" onClick={selectCampus}>글로벌</div>
                    </div>
                </div>
                <div className="common-major-selection-filter">
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
                <div className="common-major-info-wrap">
                    {
                        !majorInfo?
                        <></>:
                        <>
                            {
                                !majorInfo.totalNum?
                                <div className="common-major-info-notice-apply">인원 제한이 없는 학과입니다.<br/></div>:
                                <ApplyChart majorName={selectedMajorId} applyNum={majorInfo.applyNum} totalNum={majorInfo.totalNum} />
                            }                                        
                            {   
                                //로그인 여부 & 지원여부 검증 
                                login && thisApply == true && selectedMajorId == applyInfo.majorName?
                                <GPAChart majorName={selectedMajorId} averageGPA={majorInfo.avgGpa}/>:
                                <>
                                    <GPAChart majorName={"false"} averageGPA={majorInfo.avgGpa}/>
                                    <div className="common-major-info-notice-avg-gpa" >평균학점은 지원 후 확인할 수 있습니다😊</div>
                                </>
                            }
                        </>
                    }
                </div>
                <div className="common-apply-wrap">
                <br/><br/>
                {
                        login?
                        <>
                        {
                            thisApply == false && applyInfo.majorName != selectedMajorId?
                            <Button type="button" className="common-apply-button" onClick={applyMajor}>지원하기</Button>:
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
                                            <Button type="button"  className="common-apply-button" variant="secondary"  disabled>지원취소</Button>
                                            <br/>
                                            <small>{applyInfo.majorName}에 지원한 상태입니다.<br/>복수지원은 불가하니 양해부탁드려요😥</small>    
                                        </div>
                                    </OverlayTrigger>
                                    
                                </>:
                                <>
                                    <Button type="button" className="common-apply-button" variant="secondary" onClick={cancelApplyMajor}>지원취소</Button>
                                    <br/>
                                    <small>{applyInfo.majorName}에 지원한 상태입니다.<br/>지원취소 후 변경 가능해요.</small><br/>
                                </>
                            }   
                                
                            </>
                        }
                        </>:
                        <>
                        <span className="warning">지원하기 전, 로그인해주세요😊</span><br/>
                        <Button type="button" className="common-apply-button" onClick={()=>navigate("/login")}>Login</Button>
                        </>
                    }                    
                </div>
                <br/><br/>
            </div>
            {/* //Main */}

            {/* 로그인 시 "내 정보 Modal" */}
            <MyModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
};

export default PRateMain;