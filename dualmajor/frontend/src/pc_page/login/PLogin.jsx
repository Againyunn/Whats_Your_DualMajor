import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
//폼 제어
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from "react-validation/build/button";
//부트스트랩
import {Button,Container,Row,Col,Modal,DropdownButton,Dropdown} from 'react-bootstrap';
//팝업
import Swal from 'sweetalert2' 
//API
import AuthService from '../../services/auth.service';
// 스타일
import "../main/PMainHeader.css";
import "../main/PMainFrame.css";
import "./Plogin.css";

/**유효성 검사 함수 */
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert" style={{fontSize: "10px"}}>
        값을 넣어주세요!
      </div>
    );
  }
};

//stdNum(학번)
const vuserstdNum = (value) => {
  if (value.length < 4 || value.length > 9) {
    return (
      <div className="alert alert-danger" role="alert" style={{fontSize: "10px"}}>
        올바르게 입력해주세요.
      </div>
    );
  }
};

//password
const vpassword = (value) => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert" style={{fontSize: "10px"}}>
        올바르게 입력해주세요.
      </div>
    );
  }
};

function PLogin(){
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(false);
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfo, setMajorInfo] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

    //로그인 관련 상태관리
    const form = useRef();
    const checkBtn = useRef();
  
    const [userstdNum, setUserstdNum] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    //비밀번호 찾기 관련 상태관리
    const [resetPw, setResetPW] = useState(false);
    const [validID, setValidID] = useState("");
    const [activateResetPW, setActivateResetPW] = useState(false);
    const [newPW, setNewPW] = useState("");
  
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

    /**브라우저 화면 크기 측정 */
    useEffect(() => {
      //브라우저 사이즈 구하기
      getScreenSize();
    },[])

    /**헤더 탭 제어 기능 */
    //선택한 탭에 대한 동작 제어
    const handleSelectService = (type, state) => {
        
        //어떤 유형의 서비스를 선택했는 지 식별
        if(!type){
            resetSelectedTab();
        }
        else if(type === "r"){
            //현재 선택된 탭의 기존 상태 변경
            selectRecommandService(state);
            showPageMovePopUp("이중전공 추천 서비스","/recommend");
        }
        else if(type === "p"){
            //현재 선택된 탭의 기존 상태 변경
            selectsetPredictedRate(state);
            showPageMovePopUp("예상경쟁률 서비스");
        }
        else if(type === "m"){
            //현재 선택된 탭의 기존 상태 변경
            selectMajorInfo(state);
            showPageMovePopUp("학과정보 조회 서비스");
        }
        else if(type === "i"){
            //현재 선택된 탭의 기존 상태 변경
            selectServiceIntro(state);
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

    const selectRecommandService = (state) =>{
        let reverseState = false;

        setRecommandService(state);
        setPredictedRate(reverseState);
        setMajorInfo(reverseState);
        setServiceIntro(reverseState);
    }

    const selectsetPredictedRate = (state) =>{
        let reverseState = false;

        setRecommandService(reverseState);
        setPredictedRate(state);
        setMajorInfo(reverseState);
        setServiceIntro(reverseState);
    }

    const selectMajorInfo = (state) =>{
        let reverseState = false;

        setRecommandService(reverseState);
        setPredictedRate(reverseState);
        setMajorInfo(state);
        setServiceIntro(reverseState);
    }

    const selectServiceIntro = (state) =>{
        let reverseState = false;

        setRecommandService(reverseState);
        setPredictedRate(reverseState);
        setMajorInfo(reverseState);
        setServiceIntro(state);
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

    /**로그인 로직 */
    const onChangeUserstdNum = (e) => {
      const userstdNum = e.target.value;
      setUserstdNum(userstdNum);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

    const handleLogin = (e) => {
      e.preventDefault();
      setMessage("");
      setLoading(true);
      form.current.validateAll(); //모든 유효성검사 통과 시

      //id와 pw 모두 입력된 경우
      // if(checkUserstdNum === true && checkPassword === true){

        //백엔드 서버와 통신
        if (checkBtn.current.context._errors.length === 0) {
          AuthService.login(userstdNum, password).then( //login(stdNum, password)
            () => {
              //로그인하기 직전 페이지로 이동
              window.history.back();
              //main page로 이동
              // navigate('/');
              // window.location.reload();
            },
            (error) => {
              const resMessage =
                "로그인 정보를 확인해주세요."
              setLoading(false);
              setMessage(resMessage);
            }
          );
      }
    };

    /**비밀번호 재설정 로직 */
    //비밀번호 재설정 모달창 제어 함수
    const handleClose = () => setResetPW(false);
    const handleShow = () => setResetPW(true);

    const onChangeValidID = (e) => {
      const validID = e.target.value;
      setValidID(validID);
    };

    const onChangeNewPW = (e) => {
      const newPW = e.target.value;
      setNewPW(newPW);
    };

    //id조회 후 비밀번호 재설정 기능 활성화 함수
    const activatePW = (validID) => {
      //ID값 조회 API 백엔드 
      AuthService.checkJoinedEmail(validID).then(
        (response) => {
          if(response.data.joinedMember == true){
            //입력받은 ID값을 전달받은 경우
            setActivateResetPW(true);
          }
          else{
            Swal.fire({
              text: "아이디를 다시 확인해주세요.",
              icon: undefined,
              confirmButtonText: '확인',
              confirmButtonColor: '#002F5A'
            });
          }
        }
      )
    }

    //새로운PW를 저장 함수
    const saveNewPW = (validID, newPW) => {
      //ID값과 새로운 PW를 백엔드DB에 저장하는 API
      AuthService.editPW(validID, newPW).then(
        (response) => {
          if(response.data.isEditPasswordSuccess == true){
              //비밀번호 변경이 제대로 된 경우
              Swal.fire({
                text: "비밀번호가 재설정되었어요😉",
                icon: undefined,
                confirmButtonText: '확인',
                confirmButtonColor: '#002F5A'
              });
              
              
              AuthService.login(validID, newPW).then( //login(stdNum, password)
              () => {
      
                //main page로 이동
                navigate('/');
                // window.location.reload();
              }
            );
          }
        }
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
                    {/* 로그인 관련 처리 로직 추가 */}
                </div>
            </div>
            {/* //Header */}

            {/* Main */}
            <div className='main-wrap'>
               <Container className='loginContainer'>
               <Form onSubmit={handleLogin} ref={form}>
                <Row>
                  <div className='login-tit'>로그인</div>
                </Row>
                <Row>
                  <div className="id-pw-wrap">
                    <Col lg={2} md={2} xs={1}>
                      <label htmlFor="id-input" id="id-pw">ID</label>
                    </Col>
                    <Col lg={8} md={10} xs={9}>
                      <Input 
                        className="form-control" 
                        type="userstdNum"
                        name="userstdNum"
                        id="id-input" 
                        value={userstdNum}
                        onChange={onChangeUserstdNum}
                        // required
                        validations={[required, vuserstdNum]}
                        placeholder="학번/사번" 
                        size="20"
                      />
                    </Col>
                    <Col lg={2} md={0} xs={0}></Col>
                  </div>
                
                <div className="id-pw-wrap">
                  <Col lg={2} md={2} xs={1}>
                    <label htmlFor="pw-input"  id="id-pw">PW</label>
                  </Col>
                  <Col lg={8} md={10} xs={9}>
                    <Input 
                      className="form-control"
                      type="password"
                      name="password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required, vpassword]}
                      placeholder="비밀번호"
                      id="pw-input"
                      size="20"
                    />
                  </Col>
                  <Col lg={2} md={0} xs={0}></Col>
                </div>
                </Row>
                <Row>
                  <Col lg={2} md={1} xs={1}></Col>
                  <Col lg={8} md={11} xs={8}>
                    <CheckButton className='login-btn' ref={checkBtn}>Login</CheckButton>
                    {/* 안되면 CheckButton으로 변경 */}
                  </Col>
                  <Col lg={2} md={0} xs={1}></Col>
                </Row>
                <div className="option-wrap">
                  <Col lg={5} md={6} xs={7}>
                    <div className="reset-pw" onClick={handleShow}>
                    비밀번호 재설정
                    </div>
                  </Col>
                  <Col lg={1} md={1} xs={1}></Col>
                  <Col lg={4} md={3} xs={4}>
                    <div className="signup" onClick={()=>navigate('/signup')}>
                      회원가입
                    </div>
                  </Col>
                </div>
                {/* 입력 항목 별 유효성 검사 */}
                {message && (
                  <div className="error">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
                {/* //입력 항목 별 유효성 검사 */}
                </Form>
               </Container>
            </div>
            {/* //Main */}

            {/* PW Reset Modal */}
            <Modal show={resetPw} onHide={() => {handleClose(); setActivateResetPW(false);}}>
            <Modal.Header closeButton>
              <Modal.Title>비밀번호 재설정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container >
                <Form>
                  {/* API연결 시 Form 속성 값 지정 필요 */}
                <Row><span style={{ fontSize: "12px", color: "#C4C4C4"}}>ID 입력 후 조회를 눌러주세요.</span></Row>
                <Row>
                  <Col md={2} xs={2}>
                    ID
                  </Col>
                  <Col md={6} xs={6}>
                    <Input 
                      className="form-control" 
                      type="text" 
                      style={{fontSize: "12px"}}
                      value={validID}
                      onChange={onChangeValidID}
                      placeholder="학번/사번" 
                    ></Input>
                  </Col>
                  <Col md={4} xs={4}>
                    <Button 
                      style={{ backgroundColor: "#002F5A", opacity: "0.8", fontSize: "12px"}} 
                      onClick={() => activatePW(validID)}
                    >조회</Button>
                  </Col>
                </Row>
                {
                  !activateResetPW?
                  <span></span>:
                  <>
                    <Row><span style={{ fontSize: "12px", color: "#C4C4C4"}}>새로운 PW 입력 후 확인을 눌러주세요.</span></Row>
                    <Row>
                      <Col md={2} xs={2}>
                        PW
                      </Col>
                      <Col md={6} xs={6}>
                        <Input 
                          className="form-control" 
                          type="password" 
                          style={{fontSize: "12px"}}
                          value={newPW}
                          onChange={onChangeNewPW}
                          placeholder="새로운 비밀번호" 
                        ></Input>
                      </Col>
                      <Col md={4} xs={4}>
                        <Button 
                          style={{  backgroundColor: "#028799", opacity: "0.9", fontSize: "12px"}} 
                          onClick={() => saveNewPW(validID, newPW)}
                        >확인</Button>
                      </Col>
                    </Row>
                  </>
                }
                </Form>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={ () => {
                handleClose();
                setActivateResetPW(false);
              }}>
                닫기
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
};

export default PLogin;