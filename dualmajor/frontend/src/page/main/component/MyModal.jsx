import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import styled from 'styled-components'

export default function MyModal(props) {
  //상태값 정의
  const [userName, setUserName] = useState('닉네임')// 사용자 닉네임 
  const [userType, setUserType] = useState('멘티')// 유저유형(멘토/ 멘티)
  const [userStudentNum, setUserStudentNum] = useState('202200001')//사용자 학번(이메일의 앞부분)
  const [userMajor, setUserMajor] = useState('GBT학부'); //사용자 본전공
  const [userGrade, setUserGrade] = useState('1학년'); //사용자 학년
  const [dualMajor, setDualMajor] = useState('컴퓨터공학'); //이중전공
  const [dualMajorType, setDualMajorType] = useState('희망 이중전공'); //멘토, 멘티에 따른 이중전공의 상태값 변경



  //backend로 부터 userdata API받기



  //userType이 바뀌면 dualMajorType을 바꾸기
  useEffect(()=>{
    if(userType === '멘토'){
      setDualMajorType('이중(부)전공');
    }
    else{
      setDualMajorType('희망 이중전공');
    }
  },[userType]);



  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" >
          <h6><b>
            {userName} {userType}님, 안녕하세요.
          </b></h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={6} md={6}>
              <small><b>학번/사번:</b></small>
            </Col>
            <Col xs={6} md={6}>
            <small>{userStudentNum}</small>
            </Col>

            <Col xs={6} md={6}>
              <small><b>학과:</b></small>
            </Col>
            <Col xs={6} md={6}>
            <small>{userMajor}</small>
            </Col>

            <Col xs={6} md={6}>
              <small><b>학년:</b></small>
            </Col>
            <Col xs={6} md={6}>
              <small>{userGrade}</small>
            </Col>

            <Col xs={6} md={6}>
              <small><b>{dualMajorType}:</b></small>
            </Col>
            <Col xs={6} md={6}>
              <small>{dualMajor}</small>
            </Col>

            <Col xs={12} md={12}>
              <Modify>
                <Button className='modify'>수정하기</Button>
              </Modify>
            </Col>

            <PersonalButton>
              <Col xs={12} md={12}>
                <Button  className='recommend'>이중전공 추천 결과</Button>
              </Col>

              <Col xs={12} md={12}>
                <Button className='compete'>내 이중전공 예상 경쟁률</Button>
              </Col>

              <Col xs={12} md={12}>
                <Button className='myPost'>내가 쓴 글</Button>
              </Col>
            </PersonalButton>
          </Row>

        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Cancel>
          <Button className="cancel" onClick={props.onHide}>Close</Button>
        </Cancel>
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

