import React from 'react';
import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
//부트스트랩
import {Button,Accordion,DropdownButton,Dropdown} from 'react-bootstrap';
//팝업
import Swal from 'sweetalert2' 
//API
import RecommendService from '../../services/recommend.service';
//다시 테스트를 해야 하는 경우
import Error from '../../page/recommend/result1/Error';

// 스타일
import "../main/PMainHeader.css";
import "../main/PMainFrame.css";
import "../login/Plogin.css";

function PResult1() {
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(true); //이중전공 추천 서비스이므로 탭에 표시
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfo, setMajorInfo] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

    /**1차 결과 상태 관리 */
    //상태값 정의
    const [thisResult, setThisResult] = useState(false); //백엔드로부터 받아올 데이터
    const [isError, setIsError] = useState(false); //결과 값이 에러인지 여부 저장
    const [answer, setAnswer] = useState(false); //사용자가 선택한 학문 설정

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
            showPageMovePopUp("예상경쟁률 서비스","/rate");
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

    /**1차 결과창 노출*/
    useEffect(() => {

        //브라우저 사이즈 구하기
        getScreenSize();

        //임시 아이디 설정
        let testKeyValidate = sessionStorage.getItem('testKey');
        let resultType = sessionStorage.getItem('result1Type');

        // 세션 스토리지에 저장된 결과값을 백엔드에 요청
        RecommendService.getFirstSectionResult(resultType, testKeyValidate).then(
            (response) => {

                // console.log("getData:", response.data)

                //테스트 사용자 식별용 세션 셋팅
                sessionStorage.setItem('testKey', response.data.testKey);

                // console.log("response.data.list",response.data.list);

                //전달받은 값을 데이터로 저장
                setThisResult(response.data.list);
                //실행
                //ShowResult();
            }
        ).catch(
            (Error) => {
                //에러가 발생했음을 저장
                setIsError(true);
                
            }
        )

        //테스트용(시작)
        //setThisResult(testData.list);
        //thisResult는 테스트 종료되면 삭제 처리
        
        ShowResult();
    },[])

    /**1차 결과창 화면에 출력*/
    
    const ShowResult = () => {
        // console.log('thisResult:',thisResult);
        // console.log('testData.list.academicName:',thisResult[0]);
        // console.log('testData.list.academicName:',testData.list[0]);

        if(!thisResult){
            return;
        }

        return(
            <>
                <div className="question-container">
                    <span className='notice'>공부하고 싶은 학문을 골라주세요!<br/>선택 섹터에 따라 최종결과가 달라질 수 있어요.</span>
                    <br/>
                    <span className='notice notice-small'>* 답변에 따라, 1개의 학문 섹터만 추천될 수도 있습니다.</span>
                    </div>
                <div className="response-container">
                    <Accordion style={{width: "90%"}}>
                        {
                            //testData.list.map(thisData => (
                            thisResult.map(thisData => (
                                <>
                                    <Accordion.Item eventKey={thisData.academicName}>
                                        <div id={`${thisData.academicName}`} onClick={selectResult}>
                                            <Accordion.Header>{thisData.academicName}</Accordion.Header>
                                        </div>
                                        <Accordion.Body>
                                            {thisData.departmentList}
                                            {/* <ListGroup>
                                                <ListGroup.Item>{thisData.departmentList}</ListGroup.Item>
                                            </ListGroup> */}
                                        {/* <div className='eachResult' key={thisData.academicName} data-tip data-for={`tooltip${thisData.academicName}`} onClick={()=>{selectAcademicName(thisData.academicName)}}>
                                            
                                                {thisData.academicName}
                                            
                                                <ReactTooltip
                                                    id={`tooltip${thisData.academicName}`}
                                                    effect="solid"
                                                    place="bottom"
                                                    type="dark"
                                                    key={thisData.departmentList}
                                                    >
                                                    {thisData.departmentList}
                                                </ReactTooltip>
                                        </div> */}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </>
                            ))
                        }
                    </Accordion>
                    <Button className='confirm-btn' onClick={() => goToNext()}>다음</Button>
                </div>
            </>
        )
    }

    /**1차 결과 중 선택*/
    const selectResult =(event) =>{
        let result = event.currentTarget.id;

        // console.log("thisAcademicName:",result);
        setAnswer(result);


        //선택한 전공에 대해 색 변경(프론트에 표시)
        document.getElementById(result).style.border = "1px solid #002F5A";
        document.getElementById(result).style.color = "white";
    }

    /**2차 질문 페이지로 이동*/
    const goToNext = () => {
        //사용자가 값을 선택했을 경우에만 선택값을 백엔드로 전송
        if(answer !== false){
            //임시 아이디 설정
            let testKeyValidate = sessionStorage.getItem('testKey');

            //API전송
            RecommendService.submitFirstSectionResult(answer, testKeyValidate).then(
                (response) => {
                    sessionStorage.setItem('recommendFirstResult', true);
                    sessionStorage.setItem('questionNum', 1);
        
                    //2차 질문 page로 이동
                    navigate("/question2");
                    window.location.reload();
                }
            );
            // console.log("answer:",answer);

        }
        else{
            Swal.fire({
                text: "섹터를 선택해주세요😉",
                icon: undefined,
                confirmButtonText: '확인',
                confirmButtonColor: '#002F5A'
              });
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

            {/* 1차 결과 표시 메인 화면 */}
                <div className="start-question-layer"/><br/>
                    <div className="question-wrap">
                        {
                            !isError?
                            <>
                                {
                                    !thisResult?
                                    <></>:
                                    <ShowResult/>  
                                }
                            </>:
                                <Error/>
                        }
                    </div>
            {/* //1차 결과 표시 메인 화면 */}
        </div>
    );
}

export default PResult1;