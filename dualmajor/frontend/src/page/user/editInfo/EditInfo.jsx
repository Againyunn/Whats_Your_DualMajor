import React, {useEffect, useState, useRef} from 'react';
// import { useForm, Controller} from 'react-hook-form';
// import styled from 'styled-components';
// import axios from 'axios';
import Header from '../../main/component/Header';
// import Footer from '../../main/component/Footer';
import '../../../media/css/formFrame.css'
// import OnlyPrevFooter from '../../../common/footer/OnlyPrevFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col,  Container, Modal, Row} from 'react-bootstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from '../../../services/auth.service';
// import { isEmail } from "validator";
import { useNavigate } from 'react-router-dom';
import Select from 'react-bootstrap/FormSelect'//bootstrap 경로에서 직접 Select만 빼오기(공식문서 상으로는 Form.select로만 사용 가능한 제약 극복)
import uuid from "react-uuid";
import Swal from 'sweetalert2';   




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

export default function SignupForm() {
    //상태값 데이터 처리
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

    //메뉴바 노출 상태관리
    const showMenu = false;

    //하단바 컨트롤 : 
    const showPrev = true;
    const showNext = false;
    const showDev = false;


    //페이지 이동(call-back함수)
    let navigate = useNavigate();

    //세션에 저장된 user정보 저장
    let thisUser = false;
    if(sessionStorage.getItem('user') !== null){
        thisUser = Object.values(JSON.parse(sessionStorage.getItem('user')));
    }


    //기존의 회원정보를 value값으로 자동 입력
    useEffect(() => {
        //테스트용
        // console.log("thisUser",thisUser);

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

    //임시 학과 처리용 백엔드 연결 후 삭제 예정
    // setTotalFirstMajor(exampleFirstMajor);
    // setTotalDualMajor(exampleDualMajor);

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

    //회원가입폼 유효성 검사 후 API 전송 함수
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
        <div className="mainContainer">
            <div className="header"><Header showMenu={showMenu}/></div>
            
            <div className='mainBody'>
            <div className='formFrame'>
            <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                <Container>
                <div>
                    <Row>
                    <Col  md={12} xs={12}>
                    <span className='comment'>회원정보 수정</span>
                    </Col>
                    </Row>
                    
                    <hr/>
                    <Row>
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
                        disabled
                        />
                    </Col>
                    </Row>
                    <Row>
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
                    <Row>
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
                    <Row>
                    <Col md={5} xs={12}>
                        <span className='titleStyle'>본전공</span>
                    </Col>
                    <Col md={7} xs={12}>
                        <Select className='inputStyle' onChange={onChangeUserFirstMajor} value={firstMajor} key={uuid()}>
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

                    <Row>
                    <Col md={5} xs={12}>
                        <span className='titleStyle'>학년</span>
                    </Col>
                    <Col md={7} xs={12}>
                        <Select className='inputStyle' onChange={onChangeUserGrade} defaultValue={grade} key={uuid()}>
                        <option value="1">1학년</option>
                        <option value="2">2학년</option>
                        <option value="3">3학년</option>
                        <option value="4">4학년 이상</option>
                        </Select>
                    </Col>
                    </Row>

                    <Row>
                    <Col md={5} xs={12}>
                        <span className='titleStyle'>이용유형</span>
                    </Col>
                    <Col md={7} xs={12}>
                        <Select className='inputStyle' onChange={SelectedUserType} defaultValue={userType} key={uuid()}>
                        <option value="mentee">멘티</option>
                        <option value="mento">멘토</option>
                        </Select>
                    </Col>
                    </Row>

                    <Row>
                    <Col md={5} xs={12}>
                        <span className='titleStyle'>{showTypeDualMajor}</span>
                    </Col>
                    <Col md={7} xs={12}>
                        <Select className='inputStyle' onChange={onChangeUserDualMajor} defaultValue={dualMajor} key={uuid()}>
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

                    <Row className='tableRow'>
                        <Col md={5} xs={5}>
                            <span className='titleStyle'>총 평균학점</span>
                        </Col>
                        <Col md={7} xs={7}>
                            <Input
                                type="number" 
                                step="0.01"
                                className="form-control"
                                name="gpa"
                                value={gpa}
                                onChange={onChangeUserGpa}
                                validations={[required, vgpa]}
                            />
                        </Col>
                    </Row>
                </div>
                </Container>
                )}

                <br/>
                <Container>
                <Row>
                    <Col md={6} xs={6}>
                        <Button type='button' className='buttonContract' onClick={handleShow}>
                            탈퇴하기
                        </Button>
                    </Col>
                    <Col md={6} xs={6}>
                        <Button className='buttonRegister' type="submit">
                            수정하기
                        </Button>
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

              </div>
            </div>
            {/* <div className='footer'><Footer showPrev={showPrev} showNext={showNext} showDev={showDev}/></div> */}
        </div>
    )
    }


// const FormBlockStyle = styled.div`
// width: 45vh;
// .container{
//     background-color: white;
//   }

//   /*환영 글*/
//   .comment{

//     /*padding-top:;*/
//     padding-left: 20px;
//     padding-right: 20px;

//     /*글씨*/
//     font-size: 12px;
//     color: black;
//     font-weight: bold;
//   }

//   /*form 입력 레이아웃*/
//   .formMain{

//     text-align: left;
//   }


//   .formBlock{

//     /*모양*/

//     /*글씨*/
//     font-size: 12px;
//     color: black;
//     font-weight: bold;
//     text-align: left;

//   }
//   /*입력 칸 명*/
//   .titleStyle{

//     /*글씨*/
//     font-size: 12px;
//     color: black;
//     font-weight: bold;
//     text-align: left;

//     width: 40%;
//   }

//   /*입력 칸*/
//   .inputStyle{
//     /*레이아웃*/

//     border-radius: 5px;

//     /*글씨*/
//     font-size: 11px;
//     color: black;
//     font-weight: bold;
//     text-align: left;



//     /*호버*/
//     &:hover {
//         opacity: 0.7;
//     }

//   }

//   /*이용약관 창*/
//   .contract{

//     /*글씨*/
//     font-size: 12px;
//     color: black;
//     font-weight: bold;


//   }

//   /*이용약관 진입 버튼*/
//   .buttonContract{

//     /*모양*/
//     margin-right: 5px;
//     border-radius: 5px;


//     font-size: 14px;
//     color: white;

//     /*색*/
//     background-color: #5a5a5a;
//     opacity: 1;

//     /*호버*/
//     &:hover {
//         opacity: 0.9;
//     }
//   }

//   /*가입하기 버튼 활성화 안내 문구 */
//   .registerNotice{

//     font-size: 11px;
//     color: #C4C4C4;
//     font-weight: bold;
    
//   }

//   /*가입하기 버튼*/
//   .buttonRegister{
//     /*레이아웃*/

//     background-color: #002F5A;
//     opacity: 0.8;

//     /*모양*/
//     border-radius: 5px;

//     /*글씨*/
//     font-size: 14px;
//     color: white;
//     font-weight: bold;

//     /*호버*/
//     &:hover {
//       background-color: #002F5A;
//       opacity: 0.9;
//     }
//   }

// `
// const MainBlockStyle = styled.div`
// height: 70vh;

// div.mainContainer{
//   display: grid;
//   grid-template-rows: 0.9fr 6fr 1fr;
//   background-color: white;
//   text-align: center;
//   justify-content: center;
//   vertical-align: middle;
  
//   /*border: solid 1px #002F5A;*/

//   z-index:0;
// }


// div.header{
//   gird-row-start: 0;
//   grid-row-start: 1;

//   z-index:1;
// }

// div.mainBody{
//   gird-row-start: 1;
//   grid-row-start: 2;
// }

// div.footer{
//   margin-top:10px;
//   bottom:0px;
//   gird-row-start: 2;
//   grid-row-start: 3;
//   z-index:1;
// }
// `





// import React, {useState} from 'react';
// import { useForm, Controller} from 'react-hook-form';
// // import { Input} from '@meterial-ui/core';



// export default function App() {
//     const { handleSubmit, control, formState: {errors}} = useForm();
//     const [result, setResult] = useState('');

//     const onSubmit = (data) => setResult(JSON.stringify(data));

//     const notice = () => {
//       return(
//         <span>아이디를 입력해주세요.</span>
//       )
//     }

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className='container'>
//             <Controller
//               name='userid'
//               control={control}
//               rules={{ required: true, min:4, max:12}}
//               render={({ field }) => <input {...field} />}
//             />
//             <br/>

//           </div>
//           <input type='submit'/>
//           <p>{result}</p>

//           {
//               errors.userid?.type ==='required' && notice()//<span>아이디를 입력해주세요.</span>
//             }
//             {
//               errors.userid?.type === 'min' && <span>아이디를 확인해주세요.</span>
//             }
//             {
//               errors.userid?.type === 'max' && <span>아이디를 확인해주세요.</span>
//             }
          
//         </form>
//   )
// }

