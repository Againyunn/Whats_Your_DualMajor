import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
//내 정보 Modal
import MyModal from '../../page/main/component/MyModal';
//부트스트랩
import { Dropdown,DropdownButton,Carousel } from 'react-bootstrap';
// 스타일
import "./PMainHeader.css";
import "./PMainFrame.css";

const DIVIDER_HEIGHT = 5;

function MMainFrame(props) {

    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(false);
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfo, setMajorInfo] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);
    const [index, setIndex] = useState(0);

  
    // 각 탭 별 페이지 스크롤 이동 컨트롤
    const [moveToScrollIndex, setMoveToScrollIndex] = useState(false); //'r','p','m','i'

    /**로그인 유무 식별 후 관련 상태관리 */
    //로그인 여부 확인(기본 값: 로그인 false)
    const [login, setLogin] = useState(false);
    const [thisUser, setThisUser] = useState('');

    const [modalShow, setModalShow] = useState(false); //모달을 통해 유저 정보 화면에 랜더링

    /**반응형 상태관리 */
    const [screenSize, setScreenSize] = useState(1000);
    const [carouselImgSize, setCarouselImgSize] = useState('d-block w-70 show-flags-gif');


    // 페이지 이동 컨트롤
    let navigate = useNavigate();

    /**브라우저 창 크기 구하는 함수 */
    const getScreenSize = () => {
      let size = window.innerWidth;
      setScreenSize(size);

      if( size > 600){
        return
      }
      else if( 480 < size && size < 600 ){
          setCarouselImgSize("d-block w-70")
      }
      else if(size < 480){
          setCarouselImgSize("d-block w-70")
      }
      return size;
    }
    
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

    //랜더링 옵션
    useEffect(() => {

        //브라우저 사이즈 구하기
        getScreenSize();
    }, []);

    useEffect(() => {
        // handleMoveToScrollIndex();
        // console.log("moveToScrollIndex:",moveToScrollIndex)
        // $(document).ready( function(){
        //   $(".background-img .content-title .content-subtitle").fadeIn(2000);
        // })

        // handleSelectService();
    }, [moveToScrollIndex])

    //선택한 탭에 대한 동작 제어
    const handleSelectService = (type, state) => {
        let reverseState = null;

        // //선택한 탭의 정보를 상태값으로 저장 -> 무한루프 방지를 위해, 기존의 스크롤인덱스 상태 값과 다를 때만 변경
        // if(type !== moveToScrollIndex){
        //     setMoveToScrollIndex(type);
        // }
        // else{
        //     return;
        // }
        
        //어떤 유형의 서비스를 선택했는 지 식별
        if(!type){
            resetSelectedTab();
        }
        else if(type === "r"){
            //현재 선택된 탭의 기존 상태 변경
            // selectRecommandService(false);
            handleSelect(1)
        }
        else if(type === "p"){
            //현재 선택된 탭의 기존 상태 변경
            // selectsetPredictedRate(false);
            handleSelect(2)
        }
        else if(type === "m"){
            //현재 선택된 탭의 기존 상태 변경
            // selectMajorInfo(false);
            handleSelect(3)
        }
        else if(type === "i"){
            //현재 선택된 탭의 기존 상태 변경
            // selectServiceIntro(false);
            handleSelect(4)
        }
    }

    //각 탭별 바 표시 css변경을 위한 상태관리
    const resetSelectedTab = () =>{
        setRecommandService(false);
        setPredictedRate(false);
        setMajorInfo(false);
        setServiceIntro(false);        
    }
    
      /**각 서비스 소개 페이지의 바로가기 버튼 기능*/
      const handleMoveRecommendService = () => {
        navigate("/recommend");
      }

      const handleMoveRateService = () => {
        navigate("/rate");
      }

      const handleMoveMajorInfoService = () => {
        navigate("/seoulMajorInfo");
      }

      const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
      };

    return (
        <div>
            <div className='main-header'>

                <div className='main-icon' onClick={()=>handleSelect(0)}>
                    <img id='hufs-icon-white'src={require('../../media/main/외대마크(흰색).gif')} alt="외대 마크"/>
                    <span id='main-name'>너의 이중전공은?</span>
                </div>
                  {
                    screenSize > 480?
                    <div className='main-select-service-wrap'>

                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('r', false)}>이중전공추천</span>
                        </div>

                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('p', false)}>예상경쟁률</span>
                        </div>

                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('m', false)}>전공정보</span>
                        </div>

                        <div className='main-select-service-tab'>
                            <span onClick={()=>handleSelectService('i', false)}>서비스 소개</span>
                        </div>s
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
            <div className='inner'>
            
              <Carousel activeIndex={index} onSelect={handleSelect} slide={false} controls={true} indicators={false} fade={true}>
                  <Carousel.Item interval={3000}>
                    <img
                        className={`${carouselImgSize} m-background-img`}
                        src={require("../../media/main/E설캠본관.jpg")}
                        alt="메인 인트로" 
                    />
                      <span className='m-content-title'>너무 많은 전공,<br/>어떤 전공을 이중전공으로 할까<br/>언제까지 고민하실건가요?</span>
                      <span className='m-content-subtitle-no-hover'>학생들에 의해, 학생에게 필요한 서비스를<br/>고민하고 개발했습니다.</span>
                  </Carousel.Item>
                  <Carousel.Item interval={3000}> 
                    <img
                        className={`${carouselImgSize} m-background-img`}
                        src={require("../../media/main/E글캠백년관.jpg")}
                        alt="이중전공추천"
                    />
                      <span className='m-content-title'>내 성향과 관심사에 맞게<br/>알고리즘이 추천해드립니다.</span>
                      <span className='m-content-subtitle' onClick={() => handleMoveRecommendService()}>💡이중전공추천 서비스 바로가기</span>
                  </Carousel.Item>
                  <Carousel.Item interval={3000}>
                    <img
                        className={`${carouselImgSize} m-background-img`}
                        src={require("../../media/main/E설캠도서관.jpg")}
                        alt="예상경쟁률"
                    />
                      <span className='m-content-title'>제한적인 이중전공 신청 기회,<br/>정보를 통해 합격률을 높이세요.</span>
                      <span className='m-content-subtitle' onClick={() => handleMoveRateService()}>📊예상경쟁률 서비스 바로가기<br/>*예상경쟁률 서비스는 이중전공 신청/변경 기간에만 오픈됩니다.</span>
                  </Carousel.Item>
                  <Carousel.Item interval={3000}>
                    <img
                        className={`${carouselImgSize} m-background-img`}
                        src={require("../../media/main/E글캠도서관.jpg")}
                        alt="전공정보 조회"
                    />
                      <span className='m-content-title'>외대에 개설된 이중전공,<br/>모든 학과를 한 눈에 살펴보세요.</span>
                      <span className='m-content-subtitle' onClick={() => handleMoveMajorInfoService()}>🔎학과정보 보러가기</span>
                  </Carousel.Item>
                  <Carousel.Item interval={3000}>
                    <div className="service-intro">
                        <div className='info-title'>기획의도</div>
                      <img
                          className={`${carouselImgSize} m-background-img-info`}
                          src={require("../../media/main/기획의도.png")}
                          alt="기획의도"
                      />
                    </div>
                  </Carousel.Item>
                  <Carousel.Item interval={3000}>
                    <div className="service-intro">
                      <div className='info-title'>수요</div>
                      <img
                          className={`${carouselImgSize} m-background-img-info`}
                          src={require("../../media/main/수요.png")}
                          alt="수요"
                      />
                    </div>
                  </Carousel.Item>
                  <Carousel.Item interval={3000}>
                    <div className="service-intro">
                      <div className='info-title'>개발자 소개</div>
                      <img
                          className={`${carouselImgSize} m-background-img-info`}
                          src={require("../../media/main/개발자 소개.png")}
                          alt="개발자 소개"
                      />
                    </div>
                </Carousel.Item>
              </Carousel>
            </div>
        {/* 로그인 시 "내 정보 Modal" */}
        <MyModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    );
};

export default MMainFrame;