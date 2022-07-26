import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
//내 정보 Modal
import MyModal from '../../page/main/component/MyModal';
//부트스트랩
import {Button,Form,ListGroup,DropdownButton,Dropdown} from 'react-bootstrap';
//API
import RateService from '../../services/rate.service';
import RecommendService from '../../services/recommend.service';
//팝업
import Swal from 'sweetalert2' 
//스타일
import "../main/PMainHeader.css";
import "../main/PMainFrame.css";
import "./PMajorInfo.css"; 

function PGlobalMajorInfo(props) {
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(false);
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfoTab, setMajorInfoTab] = useState(true);
    const [serviceIntro, setServiceIntro] = useState(false);

    /**전공정보 관련 상태관리 */
    const [thisMajorList, setThisMajorList] = useState([{id: "1", name: ""}]);
    const [selectedMajorId, setSelectedMajorId] = useState("");
    const [majorDetailInfo, setMajorDetailInfo] = useState(false);

    /**로그인 유무 식별 후 관련 상태관리 */
    //로그인 여부 확인(기본 값: 로그인 false)
    const [login, setLogin] = useState(false);
    const [thisUser, setThisUser] = useState('');

    const [modalShow, setModalShow] = useState(false); //모달을 통해 유저 정보 화면에 랜더링


    /**반응형 상태관리 */
    const [screenSize, setScreenSize] = useState(1000);

    // 페이지 이동 컨트롤
    let navigate = useNavigate();

    /**(지속적으로)로그인 유무 식별 */
    //로그인 되어있는 지 확인
    useEffect( () =>{
        if(sessionStorage.getItem("user")!=null){
          setLogin(true);
        }
        else{
          setLogin(false);
        }
      })

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
            showPageMovePopUp("예상경쟁률 서비스","/rate");
        }
        else if(type === "m"){
            // showPageMovePopUp("학과정보 조회 서비스","/seoulMajorInfo");
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

    /**처음 화면 랜더링 시 → 각 캠퍼스별 전공리스트 받아오기*/
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

        // let getData = Object.values(JSON.parse(data));
        // setThisMajorList(getData);

        // setSelectedMajorId(getData[0].name);

        //브라우저 사이즈 구하기
        getScreenSize();

        RateService.getMajorListGlobal().then(
            (response) => {

                // let getData = Object.values(JSON.parse(response.data.majorListGlobal));
                let getData = response.data.majorListGlobal;
                setThisMajorList(getData);
                setSelectedMajorId(getData[0].name);
                // console.log(response.data.majorListSeoul);
            }
        )
    },[])

    /**사용자가 선택한 전공에 대한 정보 받아오기 */
    useEffect(() => {
        //        //테스트
        //        let majorData =`[
        //         {
        //             "departmentName": "GBT학부",
        //             "campus": "글로벌",
        //             "intro": "inf4",
        //             "degree": "deg4",
        //             "career": "career4",
        //             "curriculum": "cur4",
        //             "certification": "cer4",
        //             "webPage": "www.hufs.ac.kr",
        //             "phoneNum": "031-0000-0000"
        //         }
        //     ]
        // `
        // // setMajorInfo(JSON.parse(majorData));
        // let allMajorData = JSON.parse(majorData);
        // console.log("allMajorData:",allMajorData);
        // let targetIndex = allMajorData.findIndex(obj => obj.departmentName == selectedMajorId);
        // console.log("targetIndex:",targetIndex);
        // setMajorDetailInfo(allMajorData[targetIndex]);

        
        RecommendService.getDepartmentInfo(selectedMajorId).then(
            (response) => {

                //전달받은 값을 데이터로 저장
                setMajorDetailInfo(response.data);

                //선택된 전공에 맞는 버튼 노출
                PrintMajorDetailInfo();

                
                //실행
                // ShowMajorDetail();
            }
        )


    },[selectedMajorId])

    useEffect(() =>{
        ShowMajorDetail();
    },[majorDetailInfo])

    /**서울, 글로벌 선택 함수 */
    const selectCampus = (element) => {
        //서울 선택 시
        if(element.target.id === "seoul")
            navigate("/seoulMajorInfo");
    }

    /**전공 선택 시 상태값 변경함수 */
    const SelectMajorId = (e) =>{
        setSelectedMajorId(e.target.value);
    }

    /**전공 정보를 화면에 출력할 함수 */

    const ShowMajorDetail = () => {
        // console.log('thisResult:',majorDetailInfo);
        // console.log('testData.list.academicName:',majorDetailInfo);

        if(!majorDetailInfo){
            return(
                <></>
            );
        }

        return(
            <>
                <h3>{majorDetailInfo.departmentName}</h3>
    
                <ListGroup className="list-group-flush">
                    {
                        (majorDetailInfo.campus !== null)?
                        <ListGroup.Item>
                            <div className="fw-bold">캠퍼스</div><br/>
                            {majorDetailInfo.campus}</ListGroup.Item>:
                        <></>
                    }
                    {
                        (majorDetailInfo.intro !== null)?
                        <ListGroup.Item>
                            <div className="fw-bold">학과소개</div><br/>
                            {majorDetailInfo.intro}</ListGroup.Item>:
                        <></>
                    }
                    {
                        (majorDetailInfo.degree !== null)?
                        <ListGroup.Item>
                            <div className="fw-bold">졸업학위</div><br/>
                            {majorDetailInfo.degree}</ListGroup.Item>:
                        <></>
                    }
                    {
                        (majorDetailInfo.career !== null)?
                        <ListGroup.Item>
                            <div className="fw-bold">진로</div><br/>
                            {majorDetailInfo.career}</ListGroup.Item>:
                        <></>
                    }
                    {
                        (majorDetailInfo.curriculum !== null)?
                        <ListGroup.Item>
                            <div className="fw-bold">학과 커리큘럼</div><br/>
                            {majorDetailInfo.curriculum}</ListGroup.Item>:
                        <></>
                    }
                    {
                        (majorDetailInfo.certification!== null)?
                        <ListGroup.Item>
                            <div className="fw-bold">관련 자격증</div><br/>
                            {majorDetailInfo.certification}</ListGroup.Item>:
                        <></>                                                   
                    }
                    {
                        (majorDetailInfo.webPage !== null)?
                        <ListGroup.Item>
                            <div className="fw-bold">홈페이지</div><br/>
                            <a href={`${majorDetailInfo.webPage}`} target="_blank" rel="noreferrer">
                            {majorDetailInfo.webPage}</a></ListGroup.Item>:
                        <></>
                    }
                    {
                        (majorDetailInfo.phoneNum !== null)?
                        <ListGroup.Item>
                            <div className="fw-bold">학과 사무실</div><br/>
                            <a href={`tel:${majorDetailInfo.phoneNum}`}>
                                {majorDetailInfo.phoneNum}</a></ListGroup.Item>:
                        <></>
                    }
                </ListGroup>
            </>
        )
    }

    /**선택한 전공정보를 쿠키로 저장 */
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
                updateMajorDetailInfo += `/${preMajorDetailInfoArr[i]}`;
            }

            updateMajorDetailInfo += `/${selectedMajorId}`;


            localStorage.setItem("majorDetailInfo", updateMajorDetailInfo);
        }    

        //알림창 띄우기
        Swal.fire({
            text: `${selectedMajorId}이 저장되었어요😊`,
            icon: undefined,
            showConfirmButton: false,
            confirmButtonText: '확인',
            confirmButtonColor: '#002F5A'
        });

        window.location.reload();
    }

    /**선택한 전공을 쿠키에서 제거 */
    const deleteMajorDetailInfo = () => {

        //로컬에 기존의 majorDetailInfo가 있는 지 확인
        let preMajorDetailInfo = localStorage.getItem("majorDetailInfo");

        //기존에 저장내역이 없는 경우
        if(!preMajorDetailInfo){
            return;
        }
        //기존에 저장내역이 있는 경우
        else{
                    
            let preMajorDetailInfoArr = preMajorDetailInfo.split('/');
            let updateMajorDetailInfo;

            if(selectedMajorId != preMajorDetailInfoArr[0]){
                updateMajorDetailInfo = preMajorDetailInfoArr[0];
            }

            for(var i = 1; i < preMajorDetailInfoArr.length; i++){

                if(selectedMajorId != preMajorDetailInfoArr[i]){
                    updateMajorDetailInfo += `/${preMajorDetailInfoArr[i]}`;
                }
            }

            localStorage.setItem("majorDetailInfo", updateMajorDetailInfo);
        }    


        //알림창 띄우기
        Swal.fire({
        text: `${selectedMajorId}이 저장취소되었어요😀`,
        icon: undefined,
        showConfirmButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: '#002F5A'
        });

        window.location.reload();

    }

    /**전공선택 버튼 생성 */
    const PrintMajorDetailInfo = () => {
        let check = false;//false : 저장된 전공 없음, true: 저장된 전공 있음

        let preMajorDetailInfo = localStorage.getItem("majorDetailInfo");

        //기존에 저장내역이 없는 경우
        if(!preMajorDetailInfo){
            check = false;
        }
        
        //저장 내역이 있는 경우
        else{
            let preMajorDetailInfoArr = preMajorDetailInfo.split('/');

            for(var i = 1; i < preMajorDetailInfoArr.length; i++){

                if(selectedMajorId == preMajorDetailInfoArr[i]){
                    check = true;
                }
            }
        }

        //화면에 랜더링할 버튼 지정
        if(check === false){
            return(<Button type="button" className="common-info-apply-button" onClick={saveMajorDetailInfo}>저장하기</Button>);
        }

        else if(check === true){
            return(<Button type="button" className="common-info-apply-button" onClick={deleteMajorDetailInfo}>저장취소</Button>);
        }

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
            <div className='common-info-main-wrap'>
                <div className="common-info-select-campus-wrap">
                    <div className="common-info-select-flex-container">
                        <div className="global-info-select-seoul-campus" id="seoul" onClick={selectCampus}>서울</div>
                        <div className="global-info-select-global-campus" id="global" onClick={selectCampus}>글로벌</div>
                    </div>
                </div>
                <div className="common-info-major-selection-filter">
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
                <div className="common-info-major-info-wrap">
                    <ShowMajorDetail/>
                </div>
                <div className="common-info-apply-wrap">
                    <br/><br/>
                    <PrintMajorDetailInfo />
                </div>
            </div>
            {/* //Main */}
            {/* 로그인 시 "내 정보 Modal" */}
            <MyModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
}

export default PGlobalMajorInfo;