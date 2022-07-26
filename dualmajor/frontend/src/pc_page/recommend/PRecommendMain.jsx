import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
//내 정보 Modal
import MyModal from '../../page/main/component/MyModal';
//부트스트랩
import {Button,Container,Row,DropdownButton,Dropdown} from 'react-bootstrap';
//팝업
import Swal from 'sweetalert2' 
//국기 이동 캐러셀
import PFlagsCarousel from './component/PFlagsCarousel';

// 스타일
import "../main/PMainHeader.css";
import "../main/PMainFrame.css";
import "../login/Plogin.css";

function PRecommendMain() {
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(true); //이중전공 추천 서비스이므로 탭에 표시
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfo, setMajorInfo] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

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
            // showPageMovePopUp("이중전공 추천 서비스");
        }
        else if(type === "p"){
            showPageMovePopUp("예상경쟁률 서비스",'/rate');
        }
        else if(type === "m"){
            showPageMovePopUp("학과정보 조회 서비스",'/seoulMajorInfo');
        }
        else if(type === "i"){
            showPageMovePopUp("서비스 소개");
        }
    }

    //각 탭별 바 표시 css변경을 위한 상태관리
    const resetSelectedTab = () =>{
        setRecommandService(false);
        setPredictedRate(false);
        setMajorInfo(false);
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

    /**이중전공 추천 서비스 로직 */
    //초기 화면 랜더링 시 초기화(1번 실행)
    useEffect( () =>{

        //브라우저 사이즈 구하기
        getScreenSize();

        //recommendTest : 정상적인 방법으로 테스트를 처음부터 시작했는 지 검증하기 위한 값(url을 통한 비정상적 접근 방지)
        sessionStorage.setItem('recommendTest', 'true');

        //questionNum : 몇 번째 질문인지 식별할 수 있게하는 변수
        sessionStorage.setItem('questionNum', 0);
    },[])

    //PQuestion1.jsx로 이동
    const moveToQuestion = () => {
        //question page로 이동
        navigate("/question1");
        // window.location.reload();
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
                        !majorInfo?
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
            {/* 이중전공 추천 메인 페이지 */}
            <Container>
                <div className="start-main-page"/>
                <Row>
                    <PFlagsCarousel/>
                </Row>
                <Row>
                    <Button className="confirm-btn" onClick={moveToQuestion}>시작하기</Button>
                </Row>
                <Row>
                    <div className="notice-wrap">
                        <span className='notice'>신중하게 선택해주세요.<br/>테스트 중 '뒤로가기' 불가합니다!</span>
                    </div>
                </Row>
            </Container>
            {/* //이중전공 추천 메인 페이지 */}

            {/* 로그인 시 "내 정보 Modal" */}
            <MyModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
}

export default PRecommendMain;