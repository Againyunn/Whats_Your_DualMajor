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

//id(학번)
const vuserstdNum = (value) => {
  if (value.length < 4 || value.length > 9) {
    return (
      <div className="alert alert-danger" role="alert" style={{fontSize: "10px"}}>
        학번/사번을 입력해주세요.
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

//key값으로부터 value반환 함수
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function PEditUserInfo(){
    /**헤더 상태관리 */
    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(false);
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfo, setMajorInfo] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

    /**회원정보수정 상태관리 */
    const [totalFirstMajor, setTotalFirstMajor] = useState(''); //전체 본전공 학과 데이터 리스트 저장
    const [totalDualMajor, setTotalDualMajor] = useState(''); //전체 본전공 학과 데이터 리스트 저장
    const [userType, setUserType] = useState('mentee'); //멘토 멘티 유형 값
    const [showTypeDualMajor, setShowTypeDualMajor] = useState('희망이중전공');//멘토 멘티 값에 따른 이중전공 노출 변경
    const [show, setShow] = useState(false);//회원가입 약관 모달
    const [resign, setResign] = useState(false); //이용약관 동의여부 확인

    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [userstdNum, setUserstdNum] = useState("");
    const [password, setPassword] = useState("");
    const [grade, setGrade] = useState("1");
    const [firstMajor,  setFirstMajor] = useState("1");
    const [dualMajor, setDualMajor] = useState("0");
    const [gpa, setGpa] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

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

    /**회원의 기로그인 정보 세션으로부터 불러오기 */
    //세션에 저장된 user정보 저장
    let thisUser = false;
    if(sessionStorage.getItem('user') !== null){
        thisUser = Object.values(JSON.parse(sessionStorage.getItem('user')));
    }


    //기존의 회원정보를 value값으로 자동 입력
    useEffect(() => {
        //브라우저 사이즈 구하기
        getScreenSize();

        AuthService.firstMajorList();
        AuthService.dualMajorList();

        let allFirstMajor = false;
        let allDualMajor = false;
        if(localStorage.getItem('firstMajor') !== null){
            allFirstMajor = Object.values(JSON.parse(localStorage.getItem('firstMajor')));
        }
        if(localStorage.getItem('dualMajor') !== null){
            allDualMajor = Object.values(JSON.parse(localStorage.getItem('dualMajor')));
        }

        //세션에 저장된 유저 데이터의 value값만 배열로 반환하여 thisUser에 저장
        if (thisUser !== false){
            //각 항목별로 데이터 저장(순서변경되면 값이 깨지니 주의!)
            setUserstdNum(thisUser[0]); //학번/사번
            setUsername(thisUser[1]);   //닉네임
            setGrade(thisUser[2]);      //학년
            setUserType(thisUser[3]);   //사용자 유형
            setFirstMajor(thisUser[4]); //본전공 id
            setDualMajor(thisUser[5]);  //이중전공  id

            //백엔드 서버로부터 본전공/이중전공 정보받고 값을 찾아서 반환

            //전체 본전공 정보 저장
            setTotalFirstMajor(allFirstMajor);
            //전체 이중전공 정보 저장
            setTotalDualMajor(allDualMajor);             
          }
    },[])

    /**서비스 탈퇴 로직 */
    //서비스 탈퇴 신청 시
    useEffect(() => {
      //서비스 탈퇴 신청 true인 경우
      if( resign === true){
        AuthService.applyResign(userstdNum).then(
          (response)=>{
            //테스트 용
            // console.log("서비스 탈퇴 신청");

            Swal.fire({
              text: "서비스 탈퇴 신청되었어요.\n그동안 저희 서비스를 이용해주셔서 감사합니다.😊",
              icon: undefined,
              confirmButtonText: '확인',
              confirmButtonColor: '#002F5A'
              });
            
            //로그아웃처리
            AuthService.logout();

            //main page로 이동
            navigate("/");
            window.location.reload();
          },
          (error) => {
            Swal.fire({
              text: "오류가 발생했어요😭\n메일로 문의 부탁드립니다.",
              icon: undefined,
              confirmButtonText: '확인',
              confirmButtonColor: '#002F5A'
              });
          }
        )
      }
    }, [resign])

    /**회원정보 수정 입력 값에 대한 유효성 검사 */
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
        setShowTypeDualMajor('이중(부)전공');
        }
        //멘티로 유저 타입 변경
        else{
        setUserType("mentee");
        setShowTypeDualMajor('희망이중전공');
        }
    }

    const onChangeUserFirstMajor = (e) =>{
        const userFirstMajor = e.target.value;
        setFirstMajor(userFirstMajor);
    }

    const onChangeUserDualMajor = (e) =>{
        const userDualMajor = e.target.value;
        setDualMajor(userDualMajor);
    }

    /**백엔드 API전송 함수 */
    const handleRegister = (e) => {
      e.preventDefault();
      setMessage("");
      setSuccessful(false);
      form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {
      AuthService.changeInfo(userstdNum, password, username, grade, userType, firstMajor, dualMajor).then(
        (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        
        let newUser = {"stdNum":userstdNum, "nickName": username, "grade": grade, "userType": userType, "firstMajor": firstMajor, "dualMajor": dualMajor};
        //세션에 저장
        sessionStorage.setItem("user", JSON.stringify(newUser));

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
            {/* Main */}
            <div className='main-wrap'>
              <Container className="container-wrap">
              {/* 반응형 화면 조정 */}
              {
                screenSize > 600?
                <Form onSubmit={handleRegister} ref={form}>
                <Row className='main-row'>
                  <Col className="main-tit-wrap" lg={12} md={12} xs={8}>
                    <span class="main-tit">
                      회원정보 수정
                    </span>
                  </Col>
                </Row>
                <Row className='main-row'>
                  <Col lg={2} md={0} xs={0}/>
                  {/* 학번/사번 입력 */}
                  <Col  lg={3} md={5} xs={5}>
                    <OverlayTrigger
                      key='stdNumInfo'
                      placement='top'
                      overlay={
                        <Tooltip id="stdNumInfo">
                          학번/사번은 수정할 수 없어요.
                        </Tooltip>
                      }
                    >
                      <label className='input-label' htmlFor='userstdNum'>학번/사번</label>
                    </OverlayTrigger>
                    <Input 
                      type="userstdNum"
                      className="form-control"
                      name="userstdNum"
                      value={userstdNum}
                      onChange={onChangeUserstdNum}
                      validations={[required, vuserstdNum]}
                      disabled
                    />
                  </Col>
                  <Col lg={2} md={1} xs={4}/>
                  {/* 본전공 선택 */}
                  <Col lg={3} md={5} xs={8}>
                    <label className='input-label' htmlFor="firstMajor">본전공</label>
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
                  <Col lg={2} md={1} xs={2}/>
                </Row>
                <Row className='main-row'>
                  <Col lg={2} md={0} xs={0}/>
                  {/* 닉네임 */}
                  <Col lg={3} md={5} xs={5}>
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
                  <Col lg={2} md={1} xs={4}></Col>
                  {/* 학년선택 */}
                  <Col lg={3} md={5} xs={8}>
                    <label className='input-label' htmlFor='grade'>학년</label>
                    <Select className='inputStyle' id="grade" onChange={onChangeUserGrade}>
                      <option value="1학년">1학년</option>
                      <option value="2학년">2학년</option>
                      <option value="3학년">3학년</option>
                      <option value="4학년 이상">4학년 이상</option>
                  </Select>
                  </Col>
                  <Col lg={2} md={1} xs={2}/>
                </Row>
                <Row className='main-row'>
                  <Col lg={2} md={0} xs={0}/>
                  {/* 비밀번호 입력 */}
                  <Col lg={3} md={5} xs={5}>
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
                  <Col lg={2} md={1} xs={4}></Col>
                  {/* 이용 유형 선택*/}
                  <Col lg={3} md={5} xs={8}>
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
                  <Col lg={2} md={1} xs={2}/>
                </Row>
                <Row className='main-row'>
                  <Col lg={7} md={6} xs={8}/>
                  {/* 희망/이중(부)전공 선택 */}
                  <Col lg={3} md={5} xs={8}>
                    <label className='input-label' htmlFor='dualMajor'>{showTypeDualMajor}</label>
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
                  <Col lg={2} md={1} xs={2}/>
                </Row>
                <Row className='main-row'>
                  <Col lg={7} md={6} xs={8}/>
                  {/* 총 평균학점 */}
                  <Col lg={3} md={5} xs={8}>
                    <label className='input-label' htmlFor='userGPA'>총 평균학점</label>
                    <Input
                      type="number" 
                      step="0.01"
                      className="form-control"
                      name="gpa"
                      id="userGPA"
                      value={gpa}
                      onChange={onChangeUserGpa}
                      validations={[required, vgpa]}
                    />
                  </Col>
                  <Col lg={2} md={1} xs={2}/>
                </Row>
                <Row className='main-row'>
                  <Col lg={1} md={1} xs={2}/>
                  <Col  lg={5} md={5} xs={6}>
                      <Button className="withdrawal-btn" onClick={handleShow} >탈퇴하기</Button>
                  </Col>
                  <Col  lg={5} md={5} xs={6}>
                    <Button className="confirm-btn" ref={checkBtn} type="submit" >수정하기</Button>
                  </Col>
                  <Col lg={1} md={1} xs={2}/>
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
                {/* //입력 항목 별 유효성 검사 */}
              </Form>:
              <Form onSubmit={handleRegister} ref={form}>
              <Row className='main-row'>
                <Col className="main-tit-wrap" lg={12} md={12} xs={8}>
                  <span class="main-tit">
                    회원정보 수정
                  </span>
                </Col>
              </Row>
              <Row className='main-row'>
                <Col md={0} xs={0}/>
                {/* 학번/사번 입력 */}
                <Col md={8} xs={8}>
                  <OverlayTrigger
                    key='stdNumInfo'
                    placement='top'
                    overlay={
                      <Tooltip id="stdNumInfo">
                        학번/사번은 수정할 수 없어요.
                      </Tooltip>
                    }
                  >
                    <label className='input-label' htmlFor='userstdNum'>학번/사번</label>
                  </OverlayTrigger>
                  <Input 
                    type="userstdNum"
                    className="form-control"
                    name="userstdNum"
                    value={userstdNum}
                    onChange={onChangeUserstdNum}
                    validations={[required, vuserstdNum]}
                    disabled
                  />
                </Col>
                <Col md={2} xs={2}/>
              </Row>
              <Row className='main-row'>
                <Col md={0} xs={0}/>
                {/* 본전공 선택 */}
                <Col md={8} xs={8}>
                  <label className='input-label' htmlFor="firstMajor">본전공</label>
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
              <Row className='main-row'>
                <Col md={0} xs={0}/>
                {/* 닉네임 */}
                <Col md={8} xs={8}>
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
                {/* 학년선택 */}
                <Col md={8} xs={8}>
                  <label className='input-label' htmlFor='grade'>학년</label>
                  <Select className='inputStyle' id="grade" onChange={onChangeUserGrade}>
                    <option value="1학년">1학년</option>
                    <option value="2학년">2학년</option>
                    <option value="3학년">3학년</option>
                    <option value="4학년 이상">4학년 이상</option>
                </Select>
                </Col>
                <Col md={2} xs={2}/>
              </Row>
              <Row className='main-row'>
                <Col md={0} xs={0}/>
                {/* 비밀번호 입력 */}
                <Col md={8} xs={8}>
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
                {/* 이용 유형 선택*/}
                <Col md={8} xs={8}>
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
                <Col md={8} xs={8}>
                  <label className='input-label' htmlFor='dualMajor'>{showTypeDualMajor}</label>
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
                <Col md={8} xs={8}>
                  <label className='input-label' htmlFor='userGPA'>총 평균학점</label>
                  <Input
                    type="number" 
                    step="0.01"
                    className="form-control"
                    name="gpa"
                    id="userGPA"
                    value={gpa}
                    onChange={onChangeUserGpa}
                    validations={[required, vgpa]}
                  />
                </Col>
                <Col md={2} xs={2}/>
              </Row>
              <Row className='main-row'>
                <Col md={1} xs={2}/>
                <Col  lg={5} md={5} xs={4}>
                      <Button className="confirm-btn gray-btn" onClick={handleShow} >탈퇴하기</Button>
                  </Col>
                  <Col  lg={5} md={5} xs={4}>
                    <Button className="confirm-btn" ref={checkBtn} type="submit" >수정하기</Button>
                  </Col>
                <Col md={1} xs={2}/>
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
              {/* //입력 항목 별 유효성 검사 */}
            </Form>
              }
              </Container>
              {/* //회원정보수정/탈퇴 Form */}

              {/* 회원탈퇴 Modal */}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>서비스 탈퇴</Modal.Title>
                </Modal.Header>
                <Modal.Body>'너의 이중전공은? 서비스를 정말 탈퇴하시겠어요?😢</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={ () => {
                    handleClose();
                    setResign(true);
                    // setConfirm(true);
                }}>
                    탈퇴
                </Button>
                <Button style={{backgroundColor: "#002F5A", opacity: "0.8"}} onClick={() => {
                    handleClose();
                    // setConfirm(false);
                }}>
                    닫기
                </Button>
                </Modal.Footer>
            </Modal>
              {/* //회원탈퇴 Modal */}
            </div>
            {/* //Main */}
        </div>
    );
};

export default PEditUserInfo;