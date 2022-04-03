import React, {useState, useRef} from 'react';
import styled from 'styled-components'
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { useForm, Controller} from 'react-hook-form';
import { Button, Alert, FormControl} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../../services/auth.service';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        값을 넣어주세요!
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
  
    const [userstdNum, setUserstdNum] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [checkUserstdNum, setCheckUserstdNum] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    //alert창(id, pw 검증용)
    const [show, setShow] = useState(true);
  
    const onChangeUserstdNum = (e) => {
      const userstdNum = e.target.value;
      setUserstdNum(userstdNum);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

    const inputCheck = () =>{
      if(!userstdNum===false&&!password===false){
        setCheckUserstdNum(true);
        setCheckPassword(true);
        return null;
      }

      //stdNum와 pw 중 하나라도 값이 비어있는 경우
      else{
        //stdNum와 pw 둘 다 없는 경우
        if(!userstdNum===true && !password===true){
          alert("id와 pw를 입력해주세요.");
          setCheckUserstdNum(false);
          setCheckPassword(false);

        }

        //stdNum값이 없는 경우
        else if(!userstdNum===true){
          alert("id를 입력해주세요.");
          setCheckUserstdNum(false);
        }

        //pw값이 없는 경우
        else if(!password===true){
          alert("pw를 입력해주세요.");
          setCheckPassword(false);
        }
      }
    }

    const handleLogin = (e) => {
      e.preventDefault();
      setMessage("");
      setLoading(true);
      form.current.validateAll(); //모든 유효성검사 통과 시

      //id와 pw 모두 입력된 경우
      if(checkUserstdNum === true && checkPassword === true){

        //백엔드 서버와 통신
        if (checkBtn.current.context._errors.length === 0) {
          AuthService.login(userstdNum, password).then( //login(stdNum, password)
            () => {
   
              //main page로 이동
              navigate("/");
              window.location.reload();
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

        } else {
          setLoading(false);
        }
      }
    };

  return (
    <MainBlockStyle>
        <Form className='container' onSubmit={handleLogin} ref={form}>

            <label htmlFor="username" className='ID'>ID</label>
            <span className='IDBlock'>
   
            <FormControl
              className="FormControl"
              type="text"
              name="userstdNum"
              value={userstdNum}
              onChange={onChangeUserstdNum}
              // required
              // validations={[required]}
              placeholder="학번/사번" 
              size="25"
              style={{borderRadius: "5px", fontSize: "14px"}}
            />
            </span>

            <label htmlFor="password" className='PW'>PW</label>
            <span className='PWBlock'>
            <FormControl
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              // validations={[required]}
              placeholder="비밀번호"
              size="25"
              style={{borderRadius: "5px", fontSize: "14px"}}
            /></span>

          <CheckButton className='Login' ref={checkBtn} onClick={inputCheck}>Login</CheckButton>
{/* 
          <UsernameRequired checkUserName={checkUserName}/>
          <PasswordRequired checkPassword={checkPassword}/> */}

          {message && (
            <div className="error">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </Form>
    </MainBlockStyle>
  );
}

// <Form className='container' method='post' onSubmit={handleLogin}>
    
// <Form.Label className='ID'>ID</Form.Label>
// <Form.Control className='IDBlock' type="text" size="25" 
//   name="username"
//   value={username}
//   onChange={onChangeUsername}
//   placeholder="학번/사번을 입력해주세요."  pattern="[0-9]{5-9}"/>

// <Form.Label className='PW'>PW</Form.Label>
// <Form.Control  className='PWBlock' type="password" size="25" 
//   name="password"
//   value={password}
//   onChange={onChangePassword}
//   placeholder="비밀번호를 입력해주세요." />

// <Button  className='Login' variant="primary" type="submit">
// Login
// </Button>
// <br/>
// {message && (
//   <div className="form-group">
//     <div className="alert alert-danger" role="alert">
//       {message}
//     </div>
//   </div>
// )}
// </Form>

//CSS
const MainBlockStyle = styled.div`
form.container{
    display: grid;
    grid-template-columns: 1fr 1fr 4fr 1fr;
    grid-template-rows: 3fr 0.7fr 0.7fr 1fr 3fr;
    background-color: white;
    text-align: center;

    row-gap: 15px;
    column-gap: 1px;
    
    height: 75vh;
    width: 45vh;
  }

  /*아이디*/
  .ID{
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;


    /*글씨*/
    font-size: 17px;
    color: black;
    font-weight: bold;
  }

  /*아이디입력칸*/
  .IDBlock{
    /*레이아웃*/
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;

    /*모양*/
    border-radius: 5px;

    /*글씨*/
    font-size: 14px;
    color: black;
    font-weight: normal;

    /*호버*/
    &:hover {
        opacity: 0.7;
    }
  }

  /*패스워드*/
  .PW{
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;



    /*글씨*/
    font-size: 17px;
    color: black;
    font-weight: bold;

  }

  /*패스워드입력칸*/
  .PWBlock{
    /*레이아웃*/
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;


    /*모양*/
==
    border-radius: 5px;

    /*글씨*/
    font-size: 14px;
    color: black;
    font-weight: normal;

    /*호버*/
    &:hover {
        opacity: 0.7;
    }
  }

  /*로그인 버튼*/
  button.Login{
    /*레이아웃*/
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 4;
    grid-row-end: 5;

    /*색*/
    background-color: #002F5A;
    opacity: 0.8;

    /*모양*/
    border-radius: 5px;

    /*글씨*/
    font-size: 19.5px;
    color: white;
    font-weight: bold;

    /*호버*/
    &:hover {
      background-color: #002F5A;
      opacity: 0.9;
    }
  }

  /*에러 값*/
  .error{
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 5;
    grid-row-end: 6;

    /*글씨*/
    font-size: 12px;

  }
`
