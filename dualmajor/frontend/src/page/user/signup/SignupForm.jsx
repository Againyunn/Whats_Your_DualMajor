import React, {useEffect, useState, useRef} from 'react';
import { useForm, Controller} from 'react-hook-form';
import styled from 'styled-components'
import axios from 'axios'
import ShowContract from './component/ShowContract';
import Header from '../../main/component/Header';
import '../../../media/css/formFrame.css';
// import OnlyPrevFooter from '../../../common/footer/OnlyPrevFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col,  Container, Modal, Row} from 'react-bootstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from '../../../services/auth.service';
import { isEmail } from "validator";
import { useNavigate} from 'react-router-dom';
import Select from 'react-bootstrap/FormSelect'//bootstrap 경로에서 직접 Select만 빼오기(공식문서 상으로는 Form.select로만 사용 가능한 제약 극복)

import '../../../media/css/commonFrame.css'
import Footer from '../../main/component/Footer';

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

export default function SignupForm() {
  //상태값 데이터 처리

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
  const [firstMajor,  setFirstMajor] = useState("GBT학부");
  const [dualMajor, setDualMajor] = useState("없음");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [checkStdNum, setCheckStdNum] = useState(false);

  //메뉴바 노출 상태관리
  const showMenu = false;

  //하단바 컨트롤 : 
  const showPrev = true;
  const showNext = false;
  const showDev = false;

  let navigate = useNavigate();

  //입력값에 대한 유효성 검사
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
    setFirstMajor(userFirstMajor);

  }

  const onChangeUserDualMajor = (e) =>{
    const userDualMajor = e.target.value;
    setDualMajor(userDualMajor);
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
          console.log(response.data.joinPossible)
          if(response.data.joinPossible === "true"){
            setCheckStdNum(true);
            alert("가입가능한 학번/사번입니다.");
          }
          else
            alert("이미 가입된 학번/사번입니다.");
        },
        (error) => {
          alert("오류가 발생했습니다.");
        }
      );
    }
  }

  //회원가입폼 유효성 검사 후 API 전송 함수
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    
    //학번/사번 중복확인 여부 검사
    if (checkStdNum === false){
      alert("학번/사번 중복확인 해주세요.");
    }


    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(userstdNum, password, username, grade, userType, firstMajor, dualMajor).then(
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

  //선택가능한 본전공 리스트 생성
  useEffect(  () =>{
    //백엔드 서버로부터 본전공/이중전공 정보받고 값을 찾아서 반환
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

    
    //전체 본전공 정보 저장
    setTotalFirstMajor(allFirstMajor);
    //전체 이중전공 정보 저장
    setTotalDualMajor(allDualMajor);             
    

    //임시 학과 처리용 백엔드 연결 후 삭제 예정
    // setTotalFirstMajor(exampleFirstMajor);
    // setTotalDualMajor(exampleDualMajor);
  },[])


  //임시 학과 처리용 백엔드 연결 후 삭제 예정
  // const exampleFirstMajor = [{id: '1', name: "GBT학부"}, {id: '2', name:"브라질학과"}, {id: '3', name:"세르비아 크로아티아어과"} ]
  // const exampleDualMajor = [{id: '0', name: "없음"}, {id: '1', name: "GBT학부"}, {id: '2', name:"브라질학과"}, {id: '3', name:"세르비아 크로아티아어과"} ]
  


  return (
      <div className="formMainContainer">
        <div className="header"><Header showMenu={showMenu}/></div>
        <div className='mainBody'>
        <div className='formFrame'>
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <Container>
                <Row className='tableRow'>
                  <Col  md={12} xs={12}>
                  <span className='comment'>안녕하세요,<br/>
                    너의 이중전공은 서비스 회원 가입을 환영합니다!</span>
                  </Col>
                </Row>
                
                <hr/>
                <Row  className='tableRow'>
                  <Col md={5} xs={5}>
                    <span className='titleStyle'>학번/사번</span>
                  </Col>
                  <Col md={7} xs={7}>
                    <Input
                      type="userstdNum"
                      className="form-control"
                      name="userstdNum"
                      value={userstdNum}
                      onChange={onChangeUserstdNum}
                      validations={[required, vuserstdNum]}
                    />
                  </Col>
                </Row>
                <Row  className='tableRow'>
                <Col md={5} xs={5}>
                    <Button type='button' className='buttonDuplicate' onClick={stdNumCheckDuplicate} >중복확인</Button>
                  </Col>
                <Col md={7} xs={7}></Col>
                </Row>
                <br/>

                <Row className='tableRow'>
                  <Col md={5} xs={5}>
                    <span className='titleStyle'>닉네임</span>
                  </Col>
                  <Col md={7} xs={7}>
                    <Input
                        type="username"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, vusername]}
                      />
                  </Col>
                </Row>
                <Row  className='tableRow'>
                  <Col md={5} xs={5}>
                    <span className='titleStyle'>비밀번호</span>
                  </Col>
                  <Col md={7} xs={7}>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </Col>
                </Row>

                <br/>
                <Row  className='tableRow'>
                  <Col md={5} xs={12}>
                    <span className='titleStyle'>본전공</span>
                  </Col>
                  <Col md={7} xs={12}>
                    <Select className='inputStyle' onChange={onChangeUserFirstMajor}>
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
                </Row>

                <Row  className='tableRow'>
                  <Col md={5} xs={12}>
                    <span className='titleStyle'>학년</span>
                  </Col>
                  <Col md={7} xs={12}>
                    <Select className='inputStyle' onChange={onChangeUserGrade}>
                      <option value="1학년">1학년</option>
                      <option value="2학년">2학년</option>
                      <option value="3학년">3학년</option>
                      <option value="4학년 이상">4학년 이상</option>
                    </Select>
                  </Col>
                </Row>

                <Row  className='tableRow'>
                  <Col md={5} xs={12}>
                    <span className='titleStyle'>이용유형</span>
                  </Col>
                  <Col md={7} xs={12}>
                    <Select className='inputStyle' onChange={SelectedUserType}>
                      <option value="mentee">멘티</option>
                      <option value="mento">멘토</option>
                    </Select>
                  </Col>
                </Row>

                <Row  className='tableRow'>
                  <Col md={5} xs={12}>
                    <span className='titleStyle'>{dualmajor}</span>
                  </Col>
                  <Col md={7} xs={12}>
                    <Select className='inputStyle' onChange={onChangeUserDualMajor}>
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
                </Row>
              </Container>
            )}

            <br/>
            <Container>
              <Row className='tableRow'>
                <Col md={8} xs={6}></Col>
                <Col md={4} xs={6}>
                  <span className='contract'>이용약관</span>
                </Col>
                <Col md={8} xs={6}></Col>
                <Col md={4} xs={6}>
                  <Button type='button' className='buttonContract' onClick={handleShow}>
                    보기
                  </Button>
                </Col>
              </Row>

              <br/>
              <Row  className='tableRow'>
                <Col md={12} xs={12}>
                  <span className='registerNotice'>이용약관에 동의해주셔야 가입이 가능합니다.</span>
                </Col>
                <Col md={12} xs={12}>
                  <Button className='buttonRegister' type="submit" disabled={confirm}>가입하기</Button>
                </Col>
              </Row>

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

            </Container>
          </Form>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>이용약관</Modal.Title>
            </Modal.Header>
            <Modal.Body>이용약관은 추후에 추가 예정입니다.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={ () => {
                handleClose();
                setConfirm(true);
              }}>
                거부
              </Button>
              <Button style={{backgroundColor: "#002F5A", opacity: "0.8"}} onClick={() => {
                handleClose();
                setConfirm(false);
              }}>
                동의
              </Button>
            </Modal.Footer>
          </Modal>
          
          </div>
          </div>
        <div className='footer'><Footer showPrev={showPrev} showNext={showNext} showDev={showDev}/></div>
      </div>
  )
}


