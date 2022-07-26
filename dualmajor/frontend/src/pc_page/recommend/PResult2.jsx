import React from 'react';
import { useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
//내 정보 Modal
import MyModal from '../../page/main/component/MyModal';
//부트스트랩
import {Button,Modal,OverlayTrigger,Tooltip,Row,Col,Container,Accordion,ListGroup,InputGroup,FormControl,DropdownButton,Dropdown} from 'react-bootstrap';
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
import "./PRecommend.css";

function PResult1() {
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(true); //이중전공 추천 서비스이므로 탭에 표시
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfo, setMajorInfo] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

    /**1차 결과 상태 관리 */
    const [thisResult, setThisResult] = useState(false); //백엔드로부터 받아올 데이터
    const [isError, setIsError] = useState(false); //결과 값이 에러인지 여부 저장
    const [answer, setAnswer] = useState(false); //사용자가 선택한 학문 설정

    /**서비스 만족도 설문조사 상태 관리 */
    const [modalShow, setModalShow] = useState(false); //모달을 통해 만족도 수집

    /**로그인 유무 식별 후 관련 상태관리 */
    //로그인 여부 확인(기본 값: 로그인 false)
    const [login, setLogin] = useState(false);
    const [thisUser, setThisUser] = useState('');

    const [loginModalShow, setLoginModalShow] = useState(false); //모달을 통해 유저 정보 화면에 랜더링

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

    /**최종 결과창 노출*/
    useEffect(() => {

        //브라우저 사이즈 구하기
        getScreenSize();

        //임시 아이디 설정
        let testKeyValidate = sessionStorage.getItem('testKey');
        let resultType = sessionStorage.getItem('result2Type');

        //세션 스토리지에 저장된 결과값을 백엔드에 요청
        RecommendService.getFinalResult(resultType, testKeyValidate).then(
            (response) => {

                // console.log("getData:", response.data);

                //전달받은 값을 데이터로 저장
                setThisResult(response.data.info);
                //실행
                ShowResult();
            }
        ).catch(
            (Error) => {
                //에러가 발생했음을 저장
                setIsError(true);
            }
        )

        //테스트용
        // setThisResult(testData.info);
        //thisResult는 테스트 종료되면 삭제 처리

        ShowResult();
    },[])

    /**이중전공 추천 서비스 첫 화면으로 이동 */
    const goToStart = () => {
        //이중전공 추천 첫 page로 이동
        navigate("/recommend");
        window.location.reload();
        
    }

    /**최종 추천 결과 화면에 출력 */
    const ShowResult = () => {
        // console.log('thisResult:',thisResult);
        // console.log('testData.list.academicName:',thisResult[0]);

        if(!thisResult){
            return(
                <></>
            );
        }

        return(
            <>
            {
                !thisResult[0].intro?
                <>
                    {thisResult[0].departmentName}
                </>:
                <div className="response-container">
                    <Accordion style={{width:"90%"}}>
                    {
                        //testData.info.map(thisData => (
                        thisResult.map(thisData => (
                            <>
                                <Accordion.Item eventKey={thisData.departmentName} style={{width:"100%"}}>
                                    <div id={`${thisData.departmentName}`} onClick={selectResult}>
                                        <Accordion.Header>{thisData.departmentName}</Accordion.Header>
                                    </div>
                                    <Accordion.Body>
                                        <ListGroup>
                                            {
                                                (thisData.campus !== null)?
                                                <ListGroup.Item>
                                                    <div className="fw-bold">캠퍼스</div><br/>
                                                    {thisData.campus}</ListGroup.Item>:
                                                <></>
                                            }
                                            {
                                                (thisData.intro !== null)?
                                                <ListGroup.Item>
                                                    <div className="fw-bold">학과소개</div><br/>
                                                    {thisData.intro}</ListGroup.Item>:
                                                <></>
                                            }
                                            {
                                                (thisData.degree !== null)?
                                                <ListGroup.Item>
                                                    <div className="fw-bold">졸업학위</div><br/>
                                                    {thisData.degree}</ListGroup.Item>:
                                                <></>
                                            }
                                            {
                                                (thisData.career !== null)?
                                                <ListGroup.Item>
                                                    <div className="fw-bold">진로</div><br/>
                                                    {thisData.career}</ListGroup.Item>:
                                                <></>
                                            }
                                            {
                                                (thisData.curriculum !== null)?
                                                <ListGroup.Item>
                                                    <div className="fw-bold">학과 커리큘럼</div><br/>
                                                    {thisData.curriculum}</ListGroup.Item>:
                                                <></>
                                            }
                                            {
                                                (thisData.certification!== null)?
                                                <ListGroup.Item>
                                                    <div className="fw-bold">관련 자격증</div><br/>
                                                    {thisData.certification}</ListGroup.Item>:
                                                <></>                                                   
                                            }
                                            {
                                                (thisData.webPage !== null)?
                                                <ListGroup.Item>
                                                    <div className="fw-bold">홈페이지</div><br/>
                                                    <a href={`${thisData.webPage}`} target="_blank" rel="noreferrer">
                                                    {thisData.webPage}</a></ListGroup.Item>:
                                                <></>
                                            }
                                            {
                                                (!thisData.phoneNum === false)?
                                                <ListGroup.Item>
                                                    <div className="fw-bold">학과 사무실</div><br/>
                                                    <a href={`tel:${thisData.phoneNum}`}>
                                                        {thisData.phoneNum}</a></ListGroup.Item>:
                                                <></>
                                            }
                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </>
                        ))
                    }
                </Accordion>
            </div>
            }
        </>
    )}

    
    /**선택된 결과 상태관리*/
    const selectResult =(event) =>{
        let result = event.currentTarget.id;
        // let result = selectedElement.current.id;

        // console.log("selectedResult:",result);
        setAnswer(result);

        //선택한 전공에 대해 색 변경(프론트에 표시)
        document.getElementById(result).style.border = "1px solid #002F5A";
        document.getElementById(result).style.color = "white";
    }

    /**사용자의 선택 결과를 백엔드로 전송 */

    const saveData = () => {
        //사용자가 값을 선택했을 경우에만 선택값을 백엔드로 전송
        if(answer !== false){


            //임시 아이디 설정
            let testKeyValidate = sessionStorage.getItem('testKey');

            //로그인 정보 받아오기
            let thisUser = JSON.parse(sessionStorage.getItem("user"));

            //로그인 안되어 있으면 false로 값 지정
            if(!thisUser){
                thisUser = "false";
            }
            else{
                thisUser = thisUser.id;
                // console.log("thisUser:", thisUser);
            }
            // console.log("answer:",answer);

            //별점 기록 받아오기
            let starRecord = sessionStorage.getItem('starCount');

            if(!starRecord){
                sessionStorage.removeItem('starCount')
            }

            //설문조사 내용 받아오기
            let reviewQuestion1 = sessionStorage.getItem("ReviewQuestion1");
            let reviewQuestion2 = sessionStorage.getItem("ReviewQuestion2");
            let reviewQuestion3 = sessionStorage.getItem("ReviewQuestion3");
            let reviewQuestion4 = sessionStorage.getItem("ReviewQuestion4");
            let reviewQuestion5 = sessionStorage.getItem("ReviewQuestion5");
            let reviewQuestion6 = sessionStorage.getItem("ReviewQuestion6");
            let reviewQuestion7 = sessionStorage.getItem("ReviewQuestion7");

            //비회원이 차후에 회원가입 시 기존의 서비스 정보를 받을 수 있도록 -> 선택한 학과 정보 저장
            localStorage.setItem('recommendResult', answer);

            Swal.fire({
                text: "저장되었어요.\n로그인 후 내 페이지에서 결과를 다시 볼 수 있어요😊",
                icon: undefined,
                confirmButtonText: '확인',
                confirmButtonColor: '#002F5A'
              });

            //선택결과 API전송
            RecommendService.saveResult(answer, thisUser ,testKeyValidate).then(
                (response) => {
                }
            );


            //설문API전송
            RecommendService.saveSurvey(reviewQuestion1, reviewQuestion2, reviewQuestion3, reviewQuestion4, reviewQuestion5, reviewQuestion6, reviewQuestion7, starRecord, thisUser, testKeyValidate).then(
                (response) => {
                    navigate('/') //메인 화면으로 이동
                }
            )
        }
        else{
            Swal.fire({
                text: "마음에 드는 학과를 선택해주세요~😉",
                icon: undefined,
                confirmButtonText: '확인',
                confirmButtonColor: '#002F5A'
              });
        }
    }
    
    /**설문조사 Modal */
    function SatisfactionModal(props) {
        const Star = () => {
            const drawStar = (e) => {
                let thisCount = e.target.value;
                document.getElementById("realStar").style.width = `${thisCount * 10}%`;

                sessionStorage.setItem("starCount",thisCount);
            }
    
          return (
            <>
                <div className='star-wrap' >
                    <label>
                        <span className="star">
                            ★★★★★
                            <span id="realStar">★★★★★</span>
                                <input type="range" onChange={drawStar} value="1" step="1" min="0" max="10"/>
                        </span>
                    </label>
                </div>
            </>
          )
        }

        //리뷰 질문 기록용 함수
        const selectReviewQuestion1 = (e) => {
            let thisReview = e.target.value;
            sessionStorage.setItem("ReviewQuestion1",thisReview);
            //setReviewQuestion1(thisReview);

        }

        const selectReviewQuestion2 = (e) => {
            let thisReview = e.target.value;
            sessionStorage.setItem("ReviewQuestion2",thisReview);
            // setReviewQuestion2(thisReview);
        }

        const selectReviewQuestion3 = (e) => {
            let thisReview = e.target.value;
            sessionStorage.setItem("ReviewQuestion3",thisReview);
            // setReviewQuestion3(thisReview);
        }

        const selectReviewQuestion4 = (e) => {
            let thisReview = e.target.value;
            sessionStorage.setItem("ReviewQuestion4",thisReview);
            // setReviewQuestion4(thisReview);
        }

        const selectReviewQuestion5 = (e) => {
            let thisReview = e.target.value;
            sessionStorage.setItem("ReviewQuestion5",thisReview);
            // setReviewQuestion5(thisReview);
        }

        const selectReviewQuestion6 = (e) => {
            let thisReview = e.target.value;
            sessionStorage.setItem("ReviewQuestion6",thisReview);
            // setReviewQuestion6(thisReview);
        }

        const selectReviewQuestion7 = (e) => {
            let thisReview = e.target.value;
            sessionStorage.setItem("ReviewQuestion7",thisReview);
            // setReviewQuestion7(thisReview);
        }
           
        return (
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" >
                    <Container>
                    <Row>
                        <Col md={12} xs={12} >
                        <h6><b>저희 서비스 어떠셨어요?</b></h6>
                        </Col>
                    </Row>
                    </Container>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                <Container>
                    <Row>
                    <Col xs={12} md={12}>
                        <small><b>만족도 별점</b></small>
                    </Col>
                    <Col xs={12} md={12}>
                        <Star/>
                    </Col>
        
                    <Col xs={12} md={12}>
                        <small><b>현재 공부 하고 있는 본전공이 무엇인가요?</b></small>
                    </Col>
                    <Col xs={12} md={12}>
                        <InputGroup>
                            <FormControl onChange={(e) => selectReviewQuestion1(e)}  aria-label="Username"  aria-describedby="basic-addon1"  placeholder="본전공을 입력해주세요~"></FormControl>
                        </InputGroup>
                    </Col>

                    <Col xs={12} md={12}>
                        <small><b>이수하고 있는 이중(부)전공은 무엇인가요?</b></small>
                    </Col>
                    <Col xs={12} md={12}>
                        <InputGroup>
                            <FormControl onChange={(e) => selectReviewQuestion2(e)}  aria-label="Username"  aria-describedby="basic-addon1"  placeholder="이중(부)전공이 없다면 x를 입력해주세요~"></FormControl>
                        </InputGroup>
                    </Col>

                    <Col xs={12} md={12}>
                        <small><b>학우님이 알고있는 자신의 MBTI 결과는 무엇인가요?</b></small>
                    </Col>
                    <Col xs={12} md={12}>
                        <InputGroup>
                            <FormControl onChange={(e) => selectReviewQuestion3(e)}  aria-label="Username"  aria-describedby="basic-addon1"  placeholder="ex: ENTJ"></FormControl>
                        </InputGroup>
                    </Col>

                    <Col xs={12} md={12}>
                        <small><b>본 서비스의 결과값의 정확도는 어느정도 되는 것 같나요?</b></small>
                    </Col>
                    <Col xs={12} md={12}>
                        <InputGroup>
                            <FormControl onChange={(e) => selectReviewQuestion4(e)}  aria-label="Username"  aria-describedby="basic-addon1"  placeholder="0 ~ 10 사이의 값을 입력해주세요~"></FormControl>
                        </InputGroup>
                    </Col>

                    <Col xs={12} md={12}>
                        <small><b>추후 필요하거나 추가되면 좋겠다는 서비스가 있으면 적어주세요</b></small>
                    </Col>
                    <Col xs={12} md={12}>
                        <InputGroup>
                            <FormControl onChange={(e) => selectReviewQuestion5(e)}  aria-label="Username"  aria-describedby="basic-addon1"  placeholder="개선점이나 추가하면 좋을 것들~~"></FormControl>
                        </InputGroup>
                    </Col>

                    <Col xs={12} md={12}>
                        <small><b>본 서비스가 더 발전되면 사용할 용의가 있나요?</b></small>
                    </Col>
                    <Col xs={12} md={12}>
                        <InputGroup>
                            <FormControl onChange={(e) => selectReviewQuestion6(e)}  aria-label="Username"  aria-describedby="basic-addon1"  placeholder="위 질문의 피드백까지 반영되었을 때로 가정해주세요😊"></FormControl>
                        </InputGroup>
                    </Col>

                    <Col xs={12} md={12}>
                        <small><b>커피 기프티콘을 받을 카카오톡 아이디를 남겨주세요</b></small>
                    </Col>
                    <Col xs={12} md={12}>
                        <InputGroup>
                            <FormControl onChange={(e) => selectReviewQuestion7(e)}  aria-label="Username"  aria-describedby="basic-addon1"  placeholder="휴대폰 번호 혹은 카카오톡 ID를 남겨주세요~"></FormControl>
                        </InputGroup>
                    </Col>
                        
                    <div className='personal-btn-wrap'>
                        <Col xs={12} md={12}>
                        <br/>
                        <Button className='recommend' onClick={saveData}>저장하기</Button>
                        </Col>
        
                        <Col xs={12} md={12}>
                        <Button className='compete' onClick={goToStart}>다시 테스트하기</Button>
                        </Col>
        
                    </div>
                    </Row>
        
                </Container>
                </Modal.Body>
            </Modal>
        )
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
            {/* //Header */}

            {/* 최종 결과 표시 메인 화면 */}
                <div className="start-question-layer"/>
                <div className="question-wrap">
                    <div className="notice-wrap">
                        <span className='response-tit'><b>!!이중전공 추천 서비스 결과!!</b></span>
                    </div>
                    {
                        !thisResult?
                        <></>:
                        <ShowResult/>  
                    }
                </div>
                <div className="response-wrap">
                    <br/><br/>
                    {
                    !thisResult?
                    <></>:
                    <>
                    {
                        !thisResult[0].intro?
                        <>
                            <span>다시 한번 테스트 해보시겠어요?</span>
                            <br/>
                            <div className='next-Btn-container'>
                                <Button className='recommend-style-btn' onClick={() => goToStart()}>다시하기</Button>
                            </div>
                        </>:
                        <>
                            <OverlayTrigger
                                key='dev'
                                placement='top'
                                overlay={
                                <Tooltip id="dev">
                                        <span>테스트 결과는 참고만 해주세요😊</span>
                                </Tooltip>
                                }
                                >
                                <div className='next-Btn-container'>
                                    <Button className='recommend-style-btn' onClick={()=> setModalShow(true)}>저장하기</Button>
                                </div>
                            </OverlayTrigger>

                            <br/>
                            <span className='notice'>저장하기 버튼을 눌러 설문에 참여하면<br/> 추첨을 통해 베라 기프티콘을 드려요!!😁</span>
                        </>
                    }
                    </>
                }
            </div>
            {/* //최종 결과 표시 메인 화면 */}

            {/* 설문조사 Modal */}
            <SatisfactionModal show={modalShow} onHide={() => setModalShow(false)} />
            {/* //설문조사 Modal */}

            {/* 로그인 시 "내 정보 Modal" */}
            <MyModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
        </div>
    );
}

export default PResult1;