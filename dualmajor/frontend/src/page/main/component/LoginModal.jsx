import React, { useState, useEffect,  useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import AuthService from '../../../services/auth.service'
import { useNavigate, Link } from 'react-router-dom';
import '../../../media/css/login.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { useForm, Controller} from 'react-hook-form';
import { Button, Alert, Col, FormControl, Modal, Container, Row} from 'react-bootstrap';

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

export default function LoginModal() {
 
  //상태값 처리
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const [userstdNum, setUserstdNum] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // const [checkUserstdNum, setCheckUserstdNum] = useState('');
  // const [checkPassword, setCheckPassword] = useState('');

  //alert창(id, pw 검증용)
  const [show, setShow] = useState(true);

  //비밀번호 찾기
  const [resetPw, setResetPW] = useState(false);
  const [validID, setValidID] = useState("");
  const [activateResetPW, setActivateResetPW] = useState(false);
  const [newPW, setNewPW] = useState("");

  const onChangeUserstdNum = (e) => {
    const userstdNum = e.target.value;
    setUserstdNum(userstdNum);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
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
     //validID

     //입력받은 ID값을 전달받은 경우
     setActivateResetPW(true);

   }

   //새로운PW를 저장 함수
   const saveNewPW = (validID, newPW) => {
     //ID값과 새로운 PW를 백엔드DB에 저장하는 API

     //비밀번호 변경이 제대로 된 경우
     alert("비밀번호가 재설정되었습니다.")
   }

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
  
             //main page로 이동
             navigate("/");
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

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" >
          <Container>
            <Row>
              <Col md={12} xs={12} >
                <h6><b>Log In</b></h6>
              </Col>
            </Row>
          </Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Form className='loginContainer' onSubmit={handleLogin} ref={form}>

          <label htmlFor="username" className='ID'>ID</label>
          <span className='IDBlock'>

          <Input
            className="form-control"
            type="userstdNum"
            name="userstdNum"
            value={userstdNum}
            onChange={onChangeUserstdNum}
            // required
            validations={[required, vuserstdNum]}
            placeholder="학번/사번" 
            size="25"
            style={{borderRadius: "5px", fontSize: "14px"}}
          />
          </span>

          <label htmlFor="password" className='PW'>PW</label>
          <span className='PWBlock'>
          <Input
          className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            validations={[required, vpassword]}
            placeholder="비밀번호"
            size="25"
            style={{borderRadius: "5px", fontSize: "14px"}}
          /></span>

          <CheckButton className='Login' ref={checkBtn}>Login</CheckButton>

          <Button type='button' variant="secondary" className='resetPW'  onClick={handleShow}>비밀번호 재설정</Button>

          <Modal show={resetPw} onHide={() => {handleClose(); setActivateResetPW(false);}}>
          <Modal.Header closeButton>
            <Modal.Title>비밀번호 재설정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container >
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

          {message && (
          <div className="error">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
          )}
          </Form>

        </Container>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}

//수정하기 버튼 서식CSS
const Modify = styled.div`
  text-align: right;
  padding-right: 5%;

  .modify{
    /*색*/
    background-color: #5a5a5a;
    opacity: 1;

    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 20px;
    color: white;

    width: 40%;
    height: 20%;

    /*호버*/
    &:hover {
        opacity: 0.9;
    }
  }
`


//개인별 기능 버튼 서식CSS
const PersonalButton = styled.div`
  text-align: center;

  .recommend{
    /*색*/
    background-color: #002F5A;
    opacity: 0.8;

    font-size: 14px;
    width: 90%;
    height: 40%;
    margin-bottom: 8px;

    /*호버*/
    &:hover {
        background-color: #002F5A;
        opacity: 0.9;
      }
  }

  .compete{
    /*색*/
    background-color: #028799;
    opacity: 0.9;

    font-size: 14px;
    width: 90%;
    height: 40%;
    margin-bottom: 8px;

    /*호버*/
    &:hover {
        background-color: #028799;
        opacity: 1;
      }
  }

  .myPost{
    /*색*/
    background-color: #875100;
    opacity: 0.8;

    font-size: 14px;
    width: 90%;
    height: 40%;
    margin-bottom: 5px;

    /*호버*/
    &:hover {
        background-color: #875100;
        opacity: 0.9;
      }
  }
`

const Cancel = styled.div`
  .cancel{
    /*색*/
    background-color: #5a5a5a;
    opacity: 1;

    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 20px;
    color: white;



    /*호버*/
    &:hover {
        opacity: 0.9;
    }
  }
`

