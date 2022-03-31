import React, {useEffect, useState, useRef} from 'react';
import { useForm, Controller} from 'react-hook-form';
import styled from 'styled-components'
import axios from 'axios'
import ShowContract from './component/ShowContract';
import Header from '../../../common/header/Header';
import OnlyPrevFooter from '../../../common/footer/OnlyPrevFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal} from 'react-bootstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from '../../../services/auth.service';
import { isEmail } from "validator";
import { useNavigate } from 'react-router-dom';


//input 값에 대한 유효성 검사
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        값을 입력해주세요!
      </div>
    );
  }
};

//id(학번)
const vuserid = (value) => {
  if (value.length < 4 || value.length > 9) {
    return (
      <div className="alert alert-danger" role="alert">
        학번/사번을 입력해주세요.
      </div>
    );
  }
};

//nickName
const vusername = (value) => {
  if (value.length < 2 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        닉네임은 4~10글자로 구성해주세요.
      </div>
    );
  }
};

//password
const vpassword = (value) => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        비밀번호는 6~20자로 구성해주세요.
      </div>
    );
  }
};


export default function SignupForm() {
  //상태값 데이터 처리

  const [totalMajor, setTotalMajor] = useState(''); //전체 본전공 학과 데이터 리스트 저장
  const [userType, setUserType] = useState('mentee'); //멘토 멘티 유형 값
  const [dualmajor, setDualmajor] = useState('희망이중전공');//멘토 멘티 값에 따른 이중전공 노출 변경
  const [show, setShow] = useState(false);//회원가입 약관 모달
  const [confirm, setConfirm] = useState(true); //이용약관 동의여부 확인

  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [firstMajor,  setFirstMajor] = useState("");
  const [dualMajor, setDaulMajor] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  //입력값에 대한 유효성 검사
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeUserid = (e) => {
    const userid = e.target.value;
    setUserid(userid);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };


  //추가 작업 필요한 것들
  //select문의 상태값 저장 로직만 구현


  //레이아웃 디자인, select의 디자인 적용


  //회원가입폼 유효성 검사 후 API 전송 함수
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(userid, password, username, grade, userType, firstMajor, dualMajor).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          
          let newUser = {"id":userid, "nickName": username, "grade": grade, "userType": userType, "firstMajor": firstMajor, "daulMajor": dualMajor};
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

  useEffect(  () =>{
    axios.get('백엔드 본전공 학과 리스트 API')
    .then(Response => {
      setTotalMajor(Response.data)
    })
    .catch((Error) =>{
        console.log(Error);
    })

    //임시 학과 처리용 백엔드 연결 후 삭제 예정
    setTotalMajor(exampleMajor);
  },[])


  //임시 학과 처리용 백엔드 연결 후 삭제 예정
  const exampleMajor = [{id: '1', name: "GBT학부"}, {id: '2', name:"브라질학과"}, {id: '3', name:"세르비아 크로아티아어과"} ]
  
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

  //회원가입 약관 모달
  // const Modal = new Modal();
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <MainBlockStyle>
      <div className="mainContainer">
        <div className="header"><Header/></div>
        <FormBlockStyle>

          <Form className= "container" onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <span className='comment'>안녕하세요,<br/>
                  너의 이중전공은 서비스 회원 가입을 환영합니다!</span>
 

                      <div className='titleStyle'>학번/사번</div>

                          <Input
                            type="userid"
                            className="form-control"
                            name="userid"
                            value={userid}
                            onChange={onChangeUserid}
                            validations={[required, vuserid]}
                          />




                        <div className='titleStyle'>닉네임</div>

                          <Input
                              type="username"
                              className="form-control"
                              name="username"
                              value={username}
                              onChange={onChangeUsername}
                              validations={[required, vusername]}
                            /> 



                        <div className='titleStyle'>비밀번호</div>
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={onChangePassword}
                          validations={[required, vpassword]}
                        />
 
      
  
                        <div className='titleStyle'>본전공</div>

                          <select className='inputStyle'>
                          {
                            !totalMajor?  
                            <option value="1">학과 없음</option>:
                            totalMajor.map(thisMajor => (
                              <option key={thisMajor.id} value={thisMajor.id}>
                                {thisMajor.name}
                              </option>
                            ))
                          }
                          </select>



                        <div className='titleStyle'>학년</div>

                          <select className='inputStyle'>
                            <option value="1">1학년</option>
                            <option value="2">2학년</option>
                            <option value="3">3학년</option>
                            <option value="4">4학년</option>
                          </select>


                        <div className='titleStyle'>이용유형</div>

                          <select className='inputStyle' onChange={SelectedUserType}>
                            <option value="mentee">멘티</option>
                            <option value="mento">멘토</option>
                          </select>


                        <div className='titleStyle'>{dualmajor}</div>

                          <select className='inputStyle'>
                          {
                            !totalMajor?  
                            <option value="1">학과 없음</option>:
                            totalMajor.map(thisMajor => (
                              <option key={thisMajor.id} value={thisMajor.id}>
                                {thisMajor.name}
                              </option>
                            ))
                          }
                          </select>


              </div>
            )}

            <div className='contract'>이용약관
 
            <Button type='button' className='buttonContract' onClick={handleShow}>
              보기
            </Button>
            </div>
            
            <span className='registerNotice'>이용약관에 동의해야 가입하기 버튼이 활성화됩니다.</span>
            <Button className='buttonRegister' type="submit" disabled={confirm}>가입하기</Button>
            
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
          
        </FormBlockStyle>
        <div className='footer'><OnlyPrevFooter/></div>
      </div>
    </MainBlockStyle>
  )
}


const FormBlockStyle = styled.div`
.container{
    display: grid;
    grid-template-columns: 2.8fr 4fr 1.5fr;
    grid-template-rows: 1fr 5fr 1fr 0.7fr 1fr;
    background-color: white;
    text-align: center;

    row-gap: 15px;
    
    height: 75vh;
    width: 45vh;
  }

  /*환영 글*/
  .comment{
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 2;

    /*padding-top:;*/
    padding-left: 20px;
    padding-right: 20px;

    /*글씨*/
    font-size: 12px;
    color: black;
    font-weight: bold;
  }

  /*form 입력 레이아웃*/
  .formMain{
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;

    text-align: left;
  }


  .formBlock{
    /*레이아웃*/
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;

    /*모양*/

    /*글씨*/
    font-size: 12px;
    color: black;
    font-weight: bold;
    text-align: left;

  }
  /*입력 칸 명*/
  .titleStyle{
    /*레이아웃*/
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;

    /*글씨*/
    font-size: 12px;
    color: black;
    font-weight: bold;
    text-align: left;

    width: 40%;
  }

  /*입력 칸*/
  .inputStyle{
    /*레이아웃*/

    border-radius: 5px;

    /*글씨*/
    font-size: 11px;
    color: black;
    font-weight: bold;
    text-align: left;



    /*호버*/
    &:hover {
        opacity: 0.7;
    }

  }

  /*이용약관 창*/
  .contract{
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;

    /*글씨*/
    font-size: 12px;
    color: black;
    font-weight: bold;


  }

  /*이용약관 진입 버튼*/
  .buttonContract{
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;

    /*모양*/
    margin-right: 5px;
    border-radius: 5px;

    width: 100%;
    height: 40%;

    font-size: 12px;
    color: white;

    /*색*/
    background-color: #5a5a5a;
    opacity: 1;

    /*호버*/
    &:hover {
        opacity: 0.9;
    }
  }

  /*가입하기 버튼 활성화 안내 문구 */
  .registerNotice{
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 4;
    grid-row-end: 5;

    font-size: 11px;
    color: #C4C4C4;
    font-weight: bold;
    
  }

  /*가입하기 버튼*/
  .buttonRegister{
    /*레이아웃*/
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 5;
    grid-row-end: 6;

    background-color: #002F5A;
    opacity: 0.8;

    /*모양*/
    border-radius: 5px;
    width: 70%;
    height: 50%;

    /*글씨*/
    font-size: 15px;
    color: white;
    font-weight: bold;

    /*호버*/
    &:hover {
      background-color: #002F5A;
      opacity: 0.9;
    }
  }

`
const MainBlockStyle = styled.div`
    
div.mainContainer{
  display: grid;
  grid-template-rows: 0.9fr 6fr 1fr;
  background-color: white;
  text-align: center;
  justify-content: center;
  vertical-align: middle;
  
  /*border: solid 1px #002F5A;*/

  z-index:0;
}


div.header{
  gird-row-start: 0;
  grid-row-start: 1;

  z-index:1;
}

div.mainBody{
  gird-row-start: 1;
  grid-row-start: 2;
}

div.footer{
  margin-top:10px;
  bottom:0px;
  gird-row-start: 2;
  grid-row-start: 3;
  z-index:1;
}
`





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

