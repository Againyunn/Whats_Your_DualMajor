import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Col, Container, Row, ProgressBar } from 'react-bootstrap';
import RecommendService from '../../../services/recommend.service';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import ReactTooltip from 'react-tooltip';

export default function Result() {
    //상태값 정의
    const [thisResult, setThisResult] = useState(false); //백엔드로부터 받아올 데이터
    const [isError, setIsError] = useState(false); //결과 값이 에러인지 여부 저장

    //화면 이동 제어용 callback함수 정의
    let navigate = useNavigate();

    useEffect(() => {
        //세션 스토리지에 저장된 결과값을 백엔드에 요청
        RecommendService.getFirstSectionResult(sessionStorage.getItem('result1Type')).then(
            (response) => {
                //전달받은 값을 데이터로 저장
                setThisResult(response.data);
            }
        ).catch(
            (Error) => {
                //에러가 발생했음을 저장
                setIsError(true);
            }
        )
    })
    
    const goToNext = () => {
        //사용자가 값을 선택했을 경우에만 선택값을 백엔드로 전송
        // if(!thisAnswer === false){
        //     //API전송
        //     RecommendService.submitFirstSectionAnswer(questionNum, questionId, thisAnswer);

        //     //다음질문을 받을 수 있도록 세션스토리지 값 변경
        //     let nextQuestionNum = questionNum + 1;
        //     localStorage.setItem('questionNum', nextQuestionNum);
        //     setQuestionChange(nextQuestionNum);
        // }
    }

    const ShowResult = () => {
        thisResult.map(thisData => (
            <>
                <div className='eachResult' key={thisData.academicName}>
                    <span data-tip data-for="tooltip">
                        {thisData.academicName}
                    </span>
                </div>
                <ReactTooltip
                    id="tooltip"
                    effect="solid"
                    place="bottom"
                    type="dark"
                    >
                    {thisData.departmentList}
                </ReactTooltip>
            </>
        ))
    }

  return (
    <BodyBlock>
        <div className='notice'>
            <span>단과대학을 1개 골라주세요!</span><br/>
            <span>선택한 단과대학에 따라 결과가 달라집니다.</span>
        </div>
        <div className='resultFrame'>
            {
                !isError?
                <>
                    {
                        !thisResult?
                        <></>:
                        <ShowResult/>  
                    }
                </>:
                    <Error/>
            }
        </div>
        <div className='nextButtonFrame'>
        <Button className='nextButton' onClick={() => goToNext()}>다음</Button>
        </div>
    </BodyBlock>
  )
}


//CSS
const BodyBlock = styled.div`
    .container{
        display: grid;
        grid-template-rows: 1fr 5fr 1fr;
        background-color: white;
        text-align: center;
        /*justify-content: center;*/
        
        
        vertical-align: middle;
        row-gap: 10px;

        height: 70vh;
        width: 45vh;
    }
    

    /*안내문구*/
    .notice{
        grid-row-start: 1;
        grid-row-end: 2;

        grid-template-rows: repeat(auto-fit, minmax(300px, auto));

        align-items: center;
        
        /*글씨*/
        padding-top: 3%;
        font-size: 15px;
        color: #5a5a5a;

    }

    /*학문결과*/
    .resultFrame{
        grid-row-start: 2;
        grid-row-end: 3;
        grid-template-rows: repeat(auto-fit, minmax(300px, auto));

        //가운데 정렬용 선언
        display: flex;
        justify-content: center;
        align-items: center;

        .eachResult: nth-child(1){

            background-color: #002F5A;
            opacity: 0.8;
        
            /*모양*/
            border-radius: 5px;
            width: 40%;
        
            /*글씨*/
            font-size: 14px;
            color: white;
            font-weight: bold;
    
            /*호버*/
            &:hover {
                background-color: #002F5A;
                opacity: 0.9;
            }
        }

        .eachResult: nth-child(2){

            background-color: #028799;
            opacity: 0.8;
        
            /*모양*/
            border-radius: 5px;
            width: 40%;
        
            /*글씨*/
            font-size: 14px;
            color: white;
            font-weight: bold;
    
            /*호버*/
            &:hover {
                background-color: #028799;
                opacity: 0.9;
            }
        }
    }

   
    /*다음 버튼*/
    .nextButtonFrame{
        grid-row-start: 3;
        grid-row-end: 4;
        grid-template-rows: repeat(auto-fit, minmax(300px, auto));

        //가운데 정렬용 선언
        display: flex;
        justify-content: center;
        align-items: center;

        .nextButton{

            background-color: #002F5A;
            opacity: 0.8;
        
            /*모양*/
            border-radius: 5px;
            width: 40%;
        
            /*글씨*/
            font-size: 14px;
            color: white;
            font-weight: bold;
    
            /*호버*/
            &:hover {
                background-color: #002F5A;
                opacity: 0.9;
            }
        }
    }
`