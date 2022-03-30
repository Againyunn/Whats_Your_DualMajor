import React, {useState} from 'react';
import styled from 'styled-components'
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { useForm, Controller} from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

export default function MainBlock() {
  //상태값 처리
  var username=""
  var password=""

  function handleSubmit(){

  }




  return (

    



  <MainBlockStyle>
    <Form className='container' method='post'>
   
        <Form.Label className='ID'>ID</Form.Label>
        <Form.Control className='IDBlock' type="text" size="25" placeholder="학번/사번을 입력해주세요."  pattern="[0-9]{5-9}"/>

        <Form.Label className='PW'>PW</Form.Label>
        <Form.Control  className='PWBlock' type="password" size="25" placeholder="비밀번호를 입력해주세요." />

      <Button  className='Login' variant="primary" type="submit">
        Login
      </Button>
    </Form>

  </MainBlockStyle>
);
}
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

    padding-top:20%;

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

    padding-top:20%;

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
`
