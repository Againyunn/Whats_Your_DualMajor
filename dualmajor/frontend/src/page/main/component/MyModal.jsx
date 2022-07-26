import React, { useState, useEffect} from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import styled from 'styled-components'
// import axios from 'axios'
import AuthService from '../../../services/auth.service'
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'   

export default function MyModal(props) {
  //상태값 정의

  // const [thisUser, setThisUser] = useState('')//유저의 데이터
  
  //유저의 상세 데이터
  const [userName, setUserName] = useState('닉네임')// 사용자 닉네임 
  const [userType, setUserType] = useState('mentee')// 유저유형(멘토/ 멘티)
  const [userstdNum, setUserstdNum] = useState('202200001')//사용자 학번(이메일의 앞부분)
  const [userMajor, setUserMajor] = useState(''); //사용자 본전공
  const [userGrade, setUserGrade] = useState('1학년'); //사용자 학년
  const [dualMajor, setDualMajor] = useState(''); //이중전공
  const [dualMajorType, setDualMajorType] = useState('희망 이중전공'); //멘토, 멘티에 따른 이중전공의 상태값 변경

  //backend로 부터 userdata API받기
  let thisUser = false;
  if(sessionStorage.getItem('user') !== null){
    thisUser = Object.values(JSON.parse(sessionStorage.getItem('user')));
  }


  //페이지 이동(call-back함수)
  let navigate = useNavigate();

  //현재 접속한 유저의 데이터를 받아오기  
  useEffect(() => {
    
    //테스트용
    // console.log("thisUser",thisUser);

    AuthService.firstMajorList();
    AuthService.dualMajorList();

    let firstMajorList = [JSON.parse(localStorage.getItem('firstMajor'))];
    let dualMajorList = [JSON.parse(localStorage.getItem('dualMajor'))];

    //세션에 저장된 유저 데이터의 value값만 배열로 반환하여 thisUser에 저장
    if (thisUser !== false){
      //각 항목별로 데이터 저장(순서변경되면 값이 깨지니 주의!)
      setUserstdNum(thisUser[0]); //학번/사번
      setUserName(thisUser[1]); //닉네임
      setUserGrade(thisUser[2]);  //학년
      setUserType(thisUser[3]);   //사용자 유형

      let firstMajorIndex = Number(thisUser[4]);
      let dualMajorIndex = Number(thisUser[5]);

      // console.log('firstMajorName :',firstMajorList );
      // console.log('dualMajorIndex :',dualMajorList );
      // console.log('firstMajorIndex :',firstMajorIndex);
      // console.log('dualMajorIndex :',dualMajorIndex);

      if(!firstMajorList && !dualMajorList){
        let firstMajorName = firstMajorList.find((e) => {return e.id == firstMajorIndex;});
        let dualMajorName = dualMajorList.find((e) => {return e.id == dualMajorIndex;});
        setUserMajor(firstMajorName.name);//본전공 이름
        setDualMajor(dualMajorName.name);//이중전공 이름
      }


      //setUserMajor(thisUser[4]);  
      //setDualMajor(thisUser[6]);  
    }
  },[])


  //userType이 바뀌면 dualMajorType을 바꾸기
  useEffect(()=>{
    if(userType === 'mento'){
      setDualMajorType('이중(부)전공');
    }
    else{
      setDualMajorType('희망 이중전공');
    }
  },[userType]);


  //이중전공 추천결과 처리 함수
  const goToRecommendResult = () => {
    let departmentName = localStorage.getItem('recommendResult');

    //기존의 이중전공 추천결과가 있는 지 확인
    if(!departmentName){
      Swal.fire({
        text: "이중전공 추천 서비스를 이용해주세요😁",
        icon: undefined,
        confirmButtonText: '확인',
        confirmButtonColor: '#002F5A'
      });

      navigate('/recommend');
      return
    }

    navigate('/recommendResult');
 
  }

  //내가 찜한 학과로 이동
  const goToSavedMajor = () => {
      navigate("/showMyMajorInfo");
  }

  //내 예상 지원 학과로 이동
  const goToShowMyRateInfo = () => {
    navigate('/showMyRateInfo');
  }


  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" >
          <Container>
            <Row>
              <Col md={12} xs={12} >
                <h6><b>{userName} {userType}님, </b></h6>
              </Col>
              <Col md={12} xs={12} >
                <h6><b>안녕하세요.</b></h6>
              </Col>
            </Row>
          </Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={6} md={6}>
              <small><b>학번/사번:</b></small>
            </Col>
            <Col xs={6} md={6}>
            <small>{userstdNum}</small>
            </Col>

            {/* <Col xs={6} md={6}>
              <small><b>학과:</b></small>
            </Col>
            <Col xs={6} md={6}>
            <small>{userMajor}</small>
            </Col> */}

            <Col xs={6} md={6}>
              <small><b>학년:</b></small>
            </Col>
            <Col xs={6} md={6}>
              <small>{userGrade}</small>
            </Col>

            {/* <Col xs={6} md={6}>
              <small><b>{dualMajorType}:</b></small>
            </Col>
            <Col xs={6} md={6}>
              <small>{dualMajor}</small>
            </Col> */}

            <Col xs={12} md={12}>
              <Modify>
                <Link to={'/editInfo'}>
                  <Button className='modify'>수정하기</Button>
                </Link>
              </Modify>
            </Col>

            <PersonalButton>
              <Col xs={12} md={12}>
                <Button  className='recommend' onClick={goToRecommendResult}>나의 이중전공 추천 결과</Button>
              </Col>

              <Col xs={12} md={12}>
                <Button className='compete' onClick={goToShowMyRateInfo}>나의 이중전공 예상 경쟁률</Button>
              </Col>

              <Col xs={12} md={12}>
                <Button className='myPost'  onClick={goToSavedMajor}>내가 찜한 학과</Button>
              </Col>
            </PersonalButton>
          </Row>

        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Cancel>
          <Button className="cancel" onClick={ ()=> {
            //로그아웃처리
            AuthService.logout();

            //main page로 이동
            navigate("/");
            window.location.reload();
          
          }}>로그아웃</Button>
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

