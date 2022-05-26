import React, { useState, useEffect} from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import styled from 'styled-components'
import axios from 'axios'
import AuthService from '../../../services/auth.service'
import { useNavigate, Link } from 'react-router-dom';

export default function SatisfactionModal(props) {
  //상태값 정의

  // const [thisUser, setThisUser] = useState('')//유저의 데이터
  
  //유저의 상세 데이터
  // const [userName, setUserName] = useState('닉네임')// 사용자 닉네임 
  // const [userType, setUserType] = useState('mentee')// 유저유형(멘토/ 멘티)
  // const [userstdNum, setUserstdNum] = useState('202200001')//사용자 학번(이메일의 앞부분)
  // const [userMajor, setUserMajor] = useState('GBT학부'); //사용자 본전공
  // const [userGrade, setUserGrade] = useState('1학년'); //사용자 학년
  // const [dualMajor, setDualMajor] = useState('컴퓨터공학'); //이중전공
  // const [dualMajorType, setDualMajorType] = useState('희망 이중전공'); //멘토, 멘티에 따른 이중전공의 상태값 변경

  const [reviewContent, setReviewContent] = useState("");

 

  //페이지 이동(call-back함수)
  let navigate = useNavigate();

  const briefReview = (e) => {
    let thisReview = e.target.value;
    setReviewContent(thisReview);
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
              <small><b>만족도 별점:</b></small>
            </Col>
            <Col xs={12} md={12}>
            <small>별점</small>
            </Col>

            <Col xs={12} md={12}>
              <small><b>간략 후기</b></small>
            </Col>
            <Col xs={6} md={6}>
              <input type="text-aria" size="20" onChange={briefReview} placeholder="좋았던점이나 개선하면 좋을 것들 적어주세요😉"></input>
            </Col>

            <PersonalButton>
              <Col xs={12} md={12}>
                <Button  className='recommend'>결과 저장하기</Button>
              </Col>

              <Col xs={12} md={12}>
                <Button className='compete'>공유하기</Button>
              </Col>

            </PersonalButton>
          </Row>

        </Container>
      </Modal.Body>
    </Modal>
  )
}


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