import React, {useState, useRef} from 'react';
import styled from 'styled-components'
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { useForm, Controller} from 'react-hook-form';
import { Button, Alert} from 'react-bootstrap';
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


export default function MainBlock() {
  //상태값 처리
    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
    const handleLogin = (e) => {
      e.preventDefault();
      setMessage("");
      setLoading(true);
      form.current.validateAll(); //모든 유효성검사 통과 시

      if (checkBtn.current.context._errors.length === 0) {
        AuthService.login(username, password).then( //login(id, password)
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
    };


  return (
    <MainBlockStyle>
        <Form className='container' onSubmit={handleLogin} ref={form}>

            <label htmlFor="username" className='ID'>ID</label>
            <div className='IDBlock'>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
              placeholder="학번/사번을 입력해주세요." 
              size="25"
              style={{borderRadius: "5px", fontSize: "14px"}}
            />
            </div>


            <label htmlFor="password" className='PW'>PW</label>
            <div className='PWBlock'>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
              placeholder="비밀번호를 입력해주세요."
              size="25"
              style={{borderRadius: "5px", fontSize: "14px"}}
            /></div>

          <CheckButton className='Login' ref={checkBtn} >Login</CheckButton>

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
