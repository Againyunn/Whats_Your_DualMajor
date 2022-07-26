import React from 'react';
import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
//부트스트랩
import {Button,Container,ProgressBar, Row, DropdownButton, Dropdown} from 'react-bootstrap';
//팝업
import Swal from 'sweetalert2' 
//API
import RecommendService from '../../services/recommend.service';
// 스타일
import "../main/PMainHeader.css";
import "../main/PMainFrame.css";
import "../login/Plogin.css";

function PQuestion1() {
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(true); //이중전공 추천 서비스이므로 탭에 표시
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfo, setMajorInfo] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

    /**1차 질문 값 제어 상태 관리*/
    //질문 값 제어 상태 관리
    const[questionNum, setQuestionNum] = useState(1);
    const[totalQuestionNum, setTotalQuestionNum] = useState(0);
    const[questionId, setQuestionId] = useState(1);
    const[questionContent, setQuestionContent] = useState('');
    const[response1, setResponse1] = useState('');
    const[response2, setResponse2] = useState('');
    const[progressPercent, setProgressPercent] = useState(0);
    const[nextQuestionNum, setNextQuestionNum] = useState(1);
    const [thisAnswer, setThisAnswer] = useState(false);
    //전역적으로 탭 제어하기 위한 상태값
    const[controlTab, setControlTab] = useState('');

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


      /**헤더 탭 선택 값 랜더링 */
      useEffect(()=>{
        
      },[predictedRate, majorInfo, serviceIntro])

    /**1차 질문 화면 랜더링 */
    //초기 화면 랜더링 시 초기화(1번 실행)
    //백엔드로부터 질문 데이터 받아오기
    useEffect(() => {
        //브라우저 사이즈 구하기
        getScreenSize();

        //정상적인 방법으로 테스트를 하는 지 검증
        //setValidateTest(sessionStorage.getItem('recommendTest'));
        let firstValidate = sessionStorage.getItem('recommendTest');
        
        //임시 아이디 설정
        let testKeyValidate = sessionStorage.getItem('testKey');

        //비정상적인 방법으로 테스트 접근 시 이중전공 추천 서비스 첫 화면으로 강제 이동
        if(!firstValidate){
            Swal.fire({
                text: "처음부터 테스트를 진행해주세요😁",
                icon: undefined,
                confirmButtonText: '확인',
                confirmButtonColor: '#002F5A'
              });

            //recommend page로 이동
            navigate("/recommend");
            // window.location.reload();
        }
        
        let thisQuestionNum = Number(sessionStorage.getItem("questionNum"));

        //아이디 초기화 
        if(thisQuestionNum === 0){
            //처음 테스트용 임시 아이디를 요청할 때
            testKeyValidate = null;
            //처음인지 식별하기 위해 questionNum = 0을 지정했으므로, +1 처리하여 정상적인 문제의 번호 요청
            thisQuestionNum += 1;
            sessionStorage.setItem("questionNum", nextQuestionNum);
        }

        //테스트 시작
        let responseQuestionNum, responseTotalQuestionNum;

        //질문받아오기
        RecommendService.getFirstSectionQuestion(thisQuestionNum, testKeyValidate).then(
            (response) => {
                // console.log("thisData", response.data);
                // console.log("thisData Type:", typeof(response.data));

                //테스트 사용자 식별용 세션 셋팅
                sessionStorage.setItem('testKey', response.data.testKey);
                
                //현재 상태(질문)값 변경  
                responseQuestionNum = Number(response.data.questionNum);
                responseTotalQuestionNum = Number(response.data.totalQuestionNum);

                setQuestionNum(responseQuestionNum);
                setTotalQuestionNum(responseTotalQuestionNum);
                setQuestionContent(response.data.questionContent);
                setResponse1(response.data.response1);
                setResponse2(response.data.response2);

                setProgressPercent(Math.round((responseQuestionNum/responseTotalQuestionNum)*100)); //진행척도를 나타내기 위한 변수
            }
        )
    },[])

    //임시 데이터
    const imsi = () =>{
        setQuestionContent("전공에대해 이론 자체로만으로도 의미가 있다고 생각하나요? 혹은 실용적인 것만 의미가 있다고 생각하나요?")
        setResponse1("이론만으로도 의미가 있어요.")
        setResponse2("실용적이어야 해요.")
    }


    /**랜더링된 질문에 대한 선택 값을 상태에 적용 */
    //답변에 따라 값 변경
    const checkAnswer = (type) =>{
        if(type === 1){
            setThisAnswer('1');
        }

        else if(type === 2){
            setThisAnswer('2');
        }
    }

    /**다음 질문받아오기 */
    const goToNext = () => {
        //사용자가 값을 선택했을 경우에만 선택값을 백엔드로 전송
        if(thisAnswer !== false){
            //API전송
            let testKeyValidate= sessionStorage.getItem('testKey');
            let thisQuestionNum = Number(sessionStorage.getItem("questionNum"));

            RecommendService.submitFirstSectionAnswer(thisQuestionNum, testKeyValidate, thisAnswer).then(
                (response) => {
                    // console.log("submitData", response.data);

                    //테스트 사용자 식별용 세션 셋팅
                    sessionStorage.setItem('testKey', response.data.testKey);

                    if(response.data.finished != false){

                  
                
                        //결과로 받아올 값을 세션스토리지에 저장
                        sessionStorage.setItem('result1Type',response.data.finished)
                                            
                        //1차 결과 page로 이동
                        navigate("/result1");
                        // window.location.reload();
                    }
                    else{
                        //다음질문을 받을 수 있도록 세션스토리지 값 변경
                        //setNextQuestionNum(nextQuestionNum+1);
                        sessionStorage.setItem("questionNum", thisQuestionNum+1 );

                        //다음 값 가져오기 
                        window.location.reload();
                    }
                }
            );
            setThisAnswer(false);
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
                    {/* 로그인 관련 처리 로직 추가 */}
                </div>
            </div>
            {/* //Header */}

            {/* 1차 질문 표시 메인 화면 */}
            
                <div className="start-question-layer"/><br/>
                    <div className="question-wrap">
                            <div className="question-container">
                                <span className='question-tit'>질문</span>

                                <div className='question-content'>{questionContent}</div>
                            </div>
                            <div className="response-container">
                                <span className="response-tit">답변</span>
                                <div className='response-wrap'>
                                    {
                                        thisAnswer === '1'?
                                        <Button className='selected-response' >{response1}</Button>:
                                        <Button className='unselected-response' onClick={()=> checkAnswer(1)}>{response1}</Button>
                                    }
                                    
                                    {
                                        thisAnswer === '2'?
                                        <Button className='selected-response' >{response2}</Button>:
                                        <Button className='unselected-response' onClick={()=> checkAnswer(2)}>{response2}</Button>
                                    }
                                </div>
                                <ProgressBar className="question-progress" now={progressPercent} label={`${progressPercent}%`} />
     
                            <Button className='confirm-btn' onClick={() => goToNext()}>다음</Button>
                            </div>
                    </div>
            
            {/* //1차 질문 표시 메인 화면 */}
        </div>
    );
}

export default PQuestion1;