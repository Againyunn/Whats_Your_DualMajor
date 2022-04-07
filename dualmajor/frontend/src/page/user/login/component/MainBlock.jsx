import React, {useState, useRef} from 'react';
import styled from 'styled-components'
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { useForm, Controller} from 'react-hook-form';
import { Button, Alert, Col, FormControl, Modal, Container, Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../../services/auth.service';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../../../../media/css/login.css';

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

//필수 값 누락 시 alert
// function AlertDismissibleExample() {
//   const [show, setShow] = useState(true);

//   if (show) {
//     return (
//       <Alert variant="danger" onClose={() => setShow(false)} dismissible>
//         <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
//         <p>
//           Change this and that and try again. Duis mollis, est non commodo
//           luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
//           Cras mattis consectetur purus sit amet fermentum.
//         </p>
//       </Alert>
//     );
//   }
//   return <Button onClick={() => setShow(true)}>Show Alert</Button>;
// }



//html render칸에 id와 ps 각각이 입력되지 않았을 때 띄울 얼럿 <div>로 작성하기
export default function MainBlock() {
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

    // const inputCheck = () =>{
    //   if(!userstdNum===false&&!password===false){
    //     setCheckUserstdNum(true);
    //     setCheckPassword(true);
    //     return null;
    //   }

    //   //stdNum와 pw 중 하나라도 값이 비어있는 경우
    //   else{
    //     //stdNum와 pw 둘 다 없는 경우
    //     if(!userstdNum===true && !password===true){
    //       alert("id와 pw를 입력해주세요.");
    //       setCheckUserstdNum(false);
    //       setCheckPassword(false);

    //     }

    //     //stdNum값이 없는 경우
    //     else if(!userstdNum===true){
    //       alert("id를 입력해주세요.");
    //       setCheckUserstdNum(false);
    //     }

    //     //pw값이 없는 경우
    //     else if(!password===true){
    //       alert("pw를 입력해주세요.");
    //       setCheckPassword(false);
    //     }
    //   }
    // }

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
                // (error.response &&
                //   error.response.data &&
                //   error.response.data.message) ||
                // error.message ||
                // error.toString();
              setLoading(false);
              setMessage(resMessage);
            }
          );

        // } else {
        //   setLoading(false);
        // }
      }
    };

  return (
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
  );
}
