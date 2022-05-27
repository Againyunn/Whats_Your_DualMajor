import React, { useState, useEffect} from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import styled from 'styled-components'
import axios from 'axios'
import AuthService from '../../../services/auth.service'
import { useNavigate, Link } from 'react-router-dom';

export default function MyAlert({alertContent, title}) {
 
  //페이지 이동(call-back함수)
  let navigate = useNavigate();


  return (
    <Modal aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" >
          <Container>
            <Row>
              <Col md={12} xs={12} >
                <h6><b>{title}</b></h6>
              </Col>
            </Row>
          </Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={12}>
            <b>{alertContent}</b>
            </Col>
          </Row>
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

