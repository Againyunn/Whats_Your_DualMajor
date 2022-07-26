import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
//폼 제어
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from "react-validation/build/button";
//부트스트랩
import {Button,Container,Row,Col,Modal,Tooltip,OverlayTrigger,DropdownButton,Dropdown} from 'react-bootstrap';
import Select from 'react-bootstrap/FormSelect'//bootstrap 경로에서 직접 Select만 빼오기(공식문서 상으로는 Form.select로만 사용 가능한 제약 극복)
//팝업
import Swal from 'sweetalert2' 
//API
import AuthService from '../../services/auth.service';
// 스타일
import "../main/PMainHeader.css";
import "../main/PMainFrame.css";
import "./PUserInfo.css";
//회원가입 동의 사항
import ShowContract from '../../page/user/signup/component/ShowContract';

/**유효성 검사 함수 */
//input 값에 대한 유효성 검사
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert" style={{fontSize: "10px"}}>
        값을 입력해주세요!
      </div>
    );
  }
};

//stdNum(학번)
const vuserstdNum = (value) => {
  if (value.length < 4 || value.length > 9) {
    return (
      <div className="alert alert-danger" role="alert" style={{fontSize: "10px"}}>
        올바른 학번/사번을 입력해주세요.
      </div>
    );
  }
};

//nickName
const vusername = (value) => {
  if (value.length < 2 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert" style={{fontSize: "10px"}}>
        닉네임은 4~10글자로 구성해주세요.
      </div>
    );
  }
};

//password
const vpassword = (value) => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert" style={{fontSize: "10px"}}>
        비밀번호는 6~20자로 구성해주세요.
      </div>
    );
  }
};

//gpa
const vgpa = (value) => {
  if (value <= 0 || value > 4.5) {
    return (
      <div className="alert alert-danger" role="alert" style={{fontSize: "10px"}}>
        올바른 학점을 입력해주세요.
      </div>
    );
  }
};

function PSignup(){
    /**헤더 상태관리 */
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(false);
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfo, setMajorInfo] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

    /**회원가입 상태관리 */
    const [totalFirstMajor, setTotalFirstMajor] = useState(''); //전체 본전공 학과 데이터 리스트 저장
    const [totalDualMajor, setTotalDualMajor] = useState(''); //전체 본전공 학과 데이터 리스트 저장
    const [userType, setUserType] = useState('mentee'); //멘토 멘티 유형 값
    const [dualmajor, setDualmajor] = useState('희망이중전공');//멘토 멘티 값에 따른 이중전공 노출 변경
    const [show, setShow] = useState(false);//회원가입 약관 모달
    const [confirm, setConfirm] = useState(true); //이용약관 동의여부 확인
  
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [userstdNum, setUserstdNum] = useState("");
    const [password, setPassword] = useState("");
    const [grade, setGrade] = useState("1학년");
    const [firstMajor,  setFirstMajor] = useState(false);
    const [dualMajor, setDualMajor] = useState(false);
    const [gpa, setGpa] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
  
    const [checkStdNum, setCheckStdNum] = useState('');

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
            showPageMovePopUp("이중전공 추천 서비스",'/recommend');
        }
        else if(type === "p"){
            //현재 선택된 탭의 기존 상태 변경
            selectsetPredictedRate(state);
            showPageMovePopUp("예상경쟁률 서비스",'/rate');
        }
        else if(type === "m"){
            //현재 선택된 탭의 기존 상태 변경
            selectMajorInfo(state);
            showPageMovePopUp("학과정보 조회 서비스",'/seoulMajorInfo');
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

    /**회원가입 입력 값 유효성 검사*/
    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
  
    const onChangeUserstdNum = (e) => {
      const userstdNum = e.target.value;
      setUserstdNum(userstdNum);
      
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
  
    //추가 작업 필요한 것들
    //select문의 상태값 저장 로직만 구현
    const onChangeUserGrade = (e) => {
      const userGrade = e.target.value;
      setGrade(userGrade);
    }
  
    const onChangeUserGpa = (e) => {
      const userGpa = e.target.value;
      setGpa(userGpa);
    }
  
    const SelectedUserType= (selected) => {
      //멘토로 유저 타입 변경
      if(selected.target.value === "mento"){
        setUserType("mento");
        setDualmajor('이중(부)전공');
      }
  
      //멘티로 유저 타입 변경
      else{
        setUserType("mentee");
        setDualmajor('희망이중전공');
      }
    }
  
    const onChangeUserFirstMajor = (e) =>{
      const userFirstMajor = e.target.value;
  
      //본전공과 동일한 전공을 이중전공으로 선택한 경우
      if(userFirstMajor !== dualMajor){
        setFirstMajor(userFirstMajor);
        return;
      }
      setFirstMajor(false);
  
      Swal.fire({
        text: "본전공과 이중전공은 같을 수 없어요😭",
        icon: undefined,
        confirmButtonText: '확인',
        confirmButtonColor: '#002F5A'
      });
    }
  
    const onChangeUserDualMajor = (e) =>{
      const userDualMajor = e.target.value;
  
      //본전공과 동일한 전공을 이중전공으로 선택한 경우
      if(userDualMajor !== firstMajor){
        setDualMajor(userDualMajor);
        return;
      }
      setDualMajor(false);
  
      Swal.fire({
        text: "본전공과 이중전공은 같을 수 없어요😭",
        icon: undefined,
        confirmButtonText: '확인',
        confirmButtonColor: '#002F5A'
      });
    }
  
    //stdNum 중복검사
    const stdNumCheckDuplicate = () => {
      //stdNum이 입력되지 않은 경우
      if(userstdNum === ''){
        required(userstdNum);
      }
      //stdNum의 자리수가 올바르지 않는 경우
      else if(userstdNum.length < 4 || userstdNum.length > 9){
        vuserstdNum(userstdNum);
      }
      //stdNum의 자리수가 정상적인 경우
      else{
        AuthService.checkDuplicate(userstdNum).then(
          (response) => {
            //입력된 stdNum으로 상태값 변경
            // console.log(response.data.joinPossible)
            
            if(response.data.joinPossible === true){
              setCheckStdNum(true);
  
              Swal.fire({
                text: "가입가능한 학번/사번입니다.",
                icon: undefined,
                confirmButtonText: '확인',
                confirmButtonColor: '#002F5A'
              });
            }
            else
              Swal.fire({
                text: "이미 가입된 학번/사번입니다.",
                icon: undefined,
                confirmButtonText: '확인',
                confirmButtonColor: '#002F5A'
              });
          },
          (error) => {
            Swal.fire({
              text: "오류가 발생했습니다.",
              icon: undefined,
              confirmButtonText: '확인',
              confirmButtonColor: '#002F5A'
            });
          }
        );
      }
    }

    /**백엔드 API전송 함수 */
    const handleRegister = (e) => {
      e.preventDefault();
      setMessage("");
      setSuccessful(false);
      form.current.validateAll();
      
      //학번/사번 중복확인 여부 검사
      if (checkStdNum === false){
        Swal.fire({
          text: "학번/사번 중복확인 해주세요.",
          icon: undefined,
          confirmButtonText: '확인',
          confirmButtonColor: '#002F5A'
        });
        return;
      }
  
      //본전공 선택 확인
      if(firstMajor === false){
        Swal.fire({
          text: "본전공을 선택해주세요.",
          icon: undefined,
          confirmButtonText: '확인',
          confirmButtonColor: '#002F5A'
        });
        return;
      }
  
      //이중전공 선택 확인
      if(dualMajor === false){
        Swal.fire({
          text: "본전공을 선택해주세요.",
          icon: undefined,
          confirmButtonText: '확인',
          confirmButtonColor: '#002F5A'
        });
        return;
      }
  
      if(firstMajor === dualMajor){
        Swal.fire({
          text: "본전공과 이중전공은 같을 수 없어요😭",
          icon: undefined,
          confirmButtonText: '확인',
          confirmButtonColor: '#002F5A'
        });
        return;
      }
  
      if (checkBtn.current.context._errors.length === 0) {
        AuthService.register(userstdNum, password, username, grade, userType, firstMajor, dualMajor, gpa).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
            
            let newUser = {"stdNum":userstdNum, "nickName": username, "grade": grade, "userType": userType, "firstMajor": firstMajor, "dualMajor": dualMajor, "gpa": gpa};
            //세션에 저장
            sessionStorage.setItem("user", JSON.stringify(newUser));
  
            //가입 완료 알림창 띄우기
            Swal.fire({
              text: "너의 이중전공은? 가입을 환영합니다😊",
              icon: undefined,
              confirmButtonText: '확인',
              confirmButtonColor: '#002F5A'
            });
  
            //main page로 이동
            navigate("/");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              "입력값들을 다시 확인해주세요."
              // (error.response &&
              //   error.response.data &&
              //   error.response.data.message) ||
              // error.message ||
              // error.toString();
            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    /**선택가능한 본전공 리스트 생성(백엔드로부터 받은 API의 데이터 기반) */
    // useEffect(  () =>{
    //   //백엔드 서버로부터 본전공/이중전공 정보받고 값을 찾아서 반환
    //   AuthService.firstMajorList();
    //   AuthService.dualMajorList();
  
    //   let allFirstMajor = false;
    //   let allDualMajor = false;
    //   if(localStorage.getItem('firstMajor') !== null){
    //       allFirstMajor = Object.values(JSON.parse(localStorage.getItem('firstMajor')));
    //   }
    //   if(localStorage.getItem('dualMajor') !== null){
    //       allDualMajor = Object.values(JSON.parse(localStorage.getItem('dualMajor')));
    //   }
  
      
    //   //전체 본전공 정보 저장
    //   setTotalFirstMajor(allFirstMajor);
    //   //전체 이중전공 정보 저장
    //   setTotalDualMajor(allDualMajor);   
      
      
    //   //각 정보 초기화
    //   setFirstMajor(allFirstMajor[0].id);
    //   setFirstMajor(allDualMajor[0].id);
  
    //   //임시 학과 처리용 백엔드 연결 후 삭제 예정
    //   // setTotalFirstMajor(exampleFirstMajor);
    //   // setTotalDualMajor(exampleDualMajor);
    // },[])
  

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
              <Container className="container-wrap">
              {/* 반응형 화면 조정 */}
              {
                screenSize > 600?
                <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                  <div>
                  <Row className='main-row'>
                    <Col className="main-tit-wrap" lg={12} md={12} xs={8}>
                      <span class="main-tit">
                        안녕하세요,<br/>
                        너의 이중전공은 서비스 회원가입을 환영합니다! 
                      </span>
                    </Col>
                  </Row>
                  <Row className='main-row'>
                    <Col lg={2} md={0} xs={0}/>
                    {/* 학번/사번 입력 */}
                    <Col  lg={3} md={4} xs={5}>
                      <OverlayTrigger
                        key='stdNumInfo'
                        placement='top'
                        overlay={
                          <Tooltip id="stdNumInfo">
                            학우님의 학번을 입력해주세요😉
                          </Tooltip>
                        }
                      >
                        <label className='input-label' htmlFor='userstdNum'>학번/사번</label>
                      </OverlayTrigger>
                      <Input 
                        type="userstdNum"
                        className="form-control"
                        name="userstdNum"
                        id="userstdNum"
                        value={userstdNum}
                        onChange={onChangeUserstdNum}
                        validations={[required, vuserstdNum]}
                      />
                    </Col>
                    <Col lg={2} md={2} xs={4}>
                      <div className='check-dup-btn-wrap'>
                        <Button type="button" className='check-btn check-dup' onClick={stdNumCheckDuplicate}>중복확인</Button>
                      </div>
                    </Col>
                    {/* 본전공 선택 */}
                    <Col lg={3} md={4} xs={8}>
                      <label className='input-label' htmlFor='firstMajor'>본전공</label>
                      <Select className='inputStyle' id="firstMajor" onChange={onChangeUserFirstMajor}>
                      {
                        !totalFirstMajor?  
                        <option value="0">학과 없음</option>:
                        totalFirstMajor.map(thisMajor => (
                          <option key={thisMajor.id} value={thisMajor.id}>
                            {thisMajor.name}
                          </option>
                        ))
                      }
                      </Select>
                    </Col>
                    <Col lg={2} md={2} xs={2}/>
                  </Row>
                  <Row className='main-row'>
                    <Col lg={2} md={0} xs={0}/>
                    {/* 닉네임 */}
                    <Col lg={3} md={4} xs={5}>
                      <label className='input-label' htmlFor='username'>닉네임</label>
                      <Input 
                        type="username"
                        className="form-control"
                        name="username"
                        id="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, vusername]}
                      />
                    </Col>
                    <Col lg={2} md={2} xs={4}></Col>
                    {/* 학년선택 */}
                    <Col lg={3} md={4} xs={8}>
                      <label className='input-label' htmlFor='usergrade'>학년</label>
                      <Select className='inputStyle' id="usergrade" onChange={onChangeUserGrade}>
                        <option value="1학년">1학년</option>
                        <option value="2학년">2학년</option>
                        <option value="3학년">3학년</option>
                        <option value="4학년 이상">4학년 이상</option>
                    </Select>
                    </Col>
                    <Col lg={2} md={2} xs={2}/>
                  </Row>
                  <Row className='main-row'>
                    <Col lg={2} md={0} xs={0}/>
                    {/* 비밀번호 입력 */}
                    <Col lg={3} md={4} xs={5}>
                      <label className='input-label' htmlFor='password'>비밀번호</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required, vpassword]}
                      />
                    </Col>
                    <Col lg={2} md={2} xs={4}></Col>
                    {/* 이용 유형 선택*/}
                    <Col lg={3} md={4} xs={8}>
                    <OverlayTrigger
                        key='stdNumInfo'
                        placement='top'
                        overlay={
                          <Tooltip id="stdNumInfo">
                            선택해주세요😄<br/>
                            멘토: 이중(부)전공을 이수하고 있어요.<br/>
                            멘티: 아직 이중(부)전공이 없어요.
                          </Tooltip>
                        }
                      >
                        <label className='input-label' htmlFor='userType'>이용유형</label>
                      </OverlayTrigger>
                      <Select className='inputStyle' id="userType" onChange={SelectedUserType}>
                        <option value="mentee">멘티</option>
                        <option value="mento">멘토</option>
                      </Select>
                    </Col>
                    <Col lg={2} md={2} xs={2}/>
                  </Row>
                  <Row className='main-row'>
                    <Col lg={2} md={0} xs={0}/>
                    {/* 이용약관 */}
                    <Col lg={3} md={4} xs={5}>
                      <div>
                        <span className='input-label'>이용약관</span>
                        <Button className='check-btn term-service-btn' onClick={handleShow}>보기</Button>
                      </div>
                      <br/>
                    </Col>
                    <Col lg={2} md={2} xs={4}></Col>
                    {/* 희망/이중(부)전공 선택 */}
                    <Col lg={3} md={4} xs={8}>
                      <label className='input-label' htmlFor='dualMajor'>{dualmajor}</label>
                      <Select className='inputStyle' id="dualMajor" onChange={onChangeUserDualMajor}>
                      {
                        !totalDualMajor?  
                        <option value="0">학과 없음</option>:
                        totalDualMajor.map(thisMajor => (
                          <option key={thisMajor.id} value={thisMajor.id}>
                            {thisMajor.name}
                          </option>
                        ))
                      }
                      </Select> 
                    </Col>
                    <Col lg={2} md={2} xs={2}/>
                  </Row>
                  <Row>
                    <Col lg={7} md={6} xs={8}/>
                    {/* 총 평균학점 */}
                    <Col lg={3} md={4} xs={8}>
                      <label className='input-label' htmlFor="averageGPA">총 평균학점</label>
                      <Input
                        type="number" 
                        step="0.01"
                        className="form-control"
                        name="gpa"
                        id="averageGPA"
                        value={gpa}
                        onChange={onChangeUserGpa}
                        validations={[required, vgpa]}
                      />
                    </Col>
                    <Col lg={2} md={2} xs={2}/>
                  </Row>
                  </div>
                  )}
                  <Row>
                    <Col className="notice-wrap" lg={12} md={12} xs={8}>
                        <span class="notice-style">
                          *이용약관에 동의해주셔야 가입가능합니다.
                        </span>
                        <br/>
                        <Button type="submit" className="confirm-btn" ref={checkBtn} disabled={confirm}>가입하기</Button>
                    </Col>
                  </Row>
                  {/* 입력 항목 별 유효성 검사 */}
                  {message && (
                    <div className="form-group">
                      <div
                        className={ successful ? "alert alert-success" : "alert alert-danger" }
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
                  )}
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                  {/* //입력 항목 별 유효성 검사 */}
                </Form>:
                <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                  <div>
                  <Row className='main-row'>
                    <Col md={0} xs={0}/>
                    <Col className="main-tit-wrap" md={12} xs={8}>
                      <span class="main-tit">
                        안녕하세요,<br/>
                        너의 이중전공은 서비스 회원가입을 환영합니다! 
                      </span>
                    </Col>
                    <Col md={2} xs={2}/>
                  </Row>
                  <Row className='main-row'>
                    <Col md={0} xs={0}/>
                    {/* 학번/사번 입력 */}
                    <Col  md={4} xs={6}>
                      <OverlayTrigger
                        key='stdNumInfo'
                        placement='top'
                        overlay={
                          <Tooltip id="stdNumInfo">
                            학우님의 학번을 입력해주세요😉
                          </Tooltip>
                        }
                      >
                        <label className='input-label' htmlFor='userstdNum'>학번/사번</label>
                      </OverlayTrigger>
                      <Input 
                        type="userstdNum"
                        className="form-control"
                        name="userstdNum"
                        id="userstdNum"
                        value={userstdNum}
                        onChange={onChangeUserstdNum}
                        validations={[required, vuserstdNum]}
                      />
                    </Col>
                    <Col md={2} xs={4}>
                      <div className='check-dup-btn-wrap'>
                        <Button type="button" className='check-btn check-dup' onClick={stdNumCheckDuplicate}>중복확인</Button>
                      </div>
                    </Col>
                  </Row>
                  <Row className='main-row'>
                    <Col md={0} xs={0}/>
                    {/* 닉네임 */}
                    <Col md={4} xs={8}>
                      <label className='input-label' htmlFor='username'>닉네임</label>
                      <Input 
                        type="username"
                        className="form-control"
                        name="username"
                        id="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, vusername]}
                      />
                    </Col>
                    <Col md={2} xs={2}></Col>
                  </Row>
                  <Row className='main-row'>
                    <Col md={0} xs={0}/>
                    {/* 비밀번호 입력 */}
                    <Col md={4} xs={8}>
                      <label className='input-label' htmlFor='password'>비밀번호</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required, vpassword]}
                      />
                    </Col>
                    <Col md={2} xs={2}></Col>
                  </Row>
                  <Row className='main-row'>
                    <Col md={0} xs={0}/>
                    {/* 학년선택 */}
                    <Col md={4} xs={8}>
                      <label className='input-label' htmlFor='usergrade'>학년</label>
                      <Select className='inputStyle' id="usergrade" onChange={onChangeUserGrade}>
                        <option value="1학년">1학년</option>
                        <option value="2학년">2학년</option>
                        <option value="3학년">3학년</option>
                        <option value="4학년 이상">4학년 이상</option>
                    </Select>
                    </Col>
                    <Col md={2} xs={2}/>
                  </Row>
                  {/* 본전공 선택 */}
                  <Row className='main-row'>
                    <Col md={0} xs={0}/>
                    <Col md={4} xs={8}>
                      <label className='input-label' htmlFor='firstMajor'>본전공</label>
                      <Select className='inputStyle' id="firstMajor" onChange={onChangeUserFirstMajor}>
                      {
                        !totalFirstMajor?  
                        <option value="0">학과 없음</option>:
                        totalFirstMajor.map(thisMajor => (
                          <option key={thisMajor.id} value={thisMajor.id}>
                            {thisMajor.name}
                          </option>
                        ))
                      }
                      </Select>
                    </Col>
                    <Col md={2} xs={2}/>
                  </Row>



                  {/* 이용 유형 선택*/}
                  <Row className='main-row'>
                    <Col md={0} xs={0}/>
                    <Col md={4} xs={8}>
                    <OverlayTrigger
                        key='stdNumInfo'
                        placement='top'
                        overlay={
                          <Tooltip id="stdNumInfo">
                            선택해주세요😄<br/>
                            멘토: 이중(부)전공을 이수하고 있어요.<br/>
                            멘티: 아직 이중(부)전공이 없어요.
                          </Tooltip>
                        }
                      >
                        <label className='input-label' htmlFor='userType'>이용유형</label>
                      </OverlayTrigger>
                      <Select className='inputStyle' id="userType" onChange={SelectedUserType}>
                        <option value="mentee">멘티</option>
                        <option value="mento">멘토</option>
                      </Select>
                    </Col>
                    <Col md={2} xs={2}/>
                  </Row>
                  <Row className='main-row'>
                    <Col md={0} xs={0}/>
                    {/* 희망/이중(부)전공 선택 */}
                    <Col md={4} xs={8}>
                      <label className='input-label' htmlFor='dualMajor'>{dualmajor}</label>
                      <Select className='inputStyle' id="dualMajor" onChange={onChangeUserDualMajor}>
                      {
                        !totalDualMajor?  
                        <option value="0">학과 없음</option>:
                        totalDualMajor.map(thisMajor => (
                          <option key={thisMajor.id} value={thisMajor.id}>
                            {thisMajor.name}
                          </option>
                        ))
                      }
                      </Select> 
                    </Col>
                    <Col md={2} xs={2}/>
                  </Row>
                  <Row className='main-row'>
                    <Col md={0} xs={0}/>
                    {/* 총 평균학점 */}
                    <Col md={4} xs={8}>
                      <label className='input-label' htmlFor="averageGPA">총 평균학점</label>
                      <Input
                        type="number" 
                        step="0.01"
                        className="form-control"
                        name="gpa"
                        id="averageGPA"
                        value={gpa}
                        onChange={onChangeUserGpa}
                        validations={[required, vgpa]}
                      />
                    </Col>
                    <Col md={2} xs={2}/>
                  </Row>
                  <Row className='main-row'>
                    <Col md={0} xs={0}/>
                    {/* 이용약관 */}
                    <Col md={4} xs={8}>
                      <div>
                        <span className='input-label'>이용약관</span>
                        <Button className='check-btn term-service-btn' onClick={handleShow}>보기</Button>
                      </div>
                      <br/>
                    </Col>
                    <Col md={2} xs={2}></Col>
                  </Row>
                  </div>
                  )}
                  <Row className='main-row'>
                    <Col md={0} xs={0}/>
                    <Col className="notice-wrap" md={12} xs={8}>
                        <span class="notice-style">
                          *이용약관에 동의해주셔야 가입가능합니다.
                        </span>
                        <br/>
                        <Button type="submit" className="confirm-btn" ref={checkBtn} disabled={confirm}>가입하기</Button>
                    </Col>
                    <Col md={2} xs={2}/>
                  </Row>
                  {/* 입력 항목 별 유효성 검사 */}
                  {message && (
                    <div className="form-group">
                      <div
                        className={ successful ? "alert alert-success" : "alert alert-danger" }
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
                  )}
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                  {/* //입력 항목 별 유효성 검사 */}
                </Form>
              }
              </Container>
            </div>
            {/* //Main */}

            {/* Modal */}
            <Modal show={show} fullscreen={true} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>이용약관</Modal.Title>
              </Modal.Header>
              <Modal.Body><ShowContract/></Modal.Body>
              <Modal.Footer>
                <Button className="withdrawal-btn" onClick={ () => {
                  handleClose();
                  setConfirm(true);
                }}>
                  거부
                </Button>
                <Button className="confirm-btn" onClick={() => {
                  handleClose();
                  setConfirm(false);
                }}>
                  동의
                </Button>
              </Modal.Footer>
            </Modal>
            {/* //Modal */}
        </div>
    );
};

export default PSignup;