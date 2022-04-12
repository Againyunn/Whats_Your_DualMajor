import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Col, Container, Row, ProgressBar } from 'react-bootstrap';

export default function Question({questionNum, totalQuestionNum, questionContent, response1, response2}) {
    //상태값 및 변수 정의
    const [thisResponse, setThisResponse] = useState(false);
    let progressPercent = Math.round(questionNum/totalQuestionNum *100); //진행척도를 나타내기 위한 변수

    console.log(progressPercent)
    //답변에 따라 값 변경
    const checkAnswer = (type) =>{
        if(type === 1){
            setThisResponse('1');
        }

        else if(type === 2){
            setThisResponse('2');
        }
    }

    
  return (
    <BodyBlock>
        <div className='container'>

            <div className='questionTitle'>질문</div>
            <div className='questionContent'>{questionContent}</div>
            <br/>

            <div className='responseTitle'>답변</div>
            {
                thisResponse === '1'?
                <Button className='checkedResponse1' >{response1}</Button>:
                <Button className='response1' onClick={()=> checkAnswer(1)}>{response1}</Button>
            }
            
            {
                thisResponse === '2'?
                <Button className='checkedResponse2' >{response2}</Button>:
                <Button className='response2' onClick={()=> checkAnswer(2)}>{response2}</Button>
            }

            <div className='statusBar'>
                <ProgressBar striped variant="success" animated now={progressPercent} />
            </div>
        
            <div className='nextButtonFrame'>
                <Button className='nextButton'>다음</Button>
            </div>
        </div>
    </BodyBlock>
  )
}


//CSS
const BodyBlock = styled.div`
    .container{
        display: grid;
        grid-template-rows: 1fr 4fr 1fr 1fr 1fr 1fr 1fr;
        background-color: white;
        text-align: center;
        /*justify-content: center;*/
        
        
        vertical-align: middle;
        row-gap: 10px;

        height: 70vh;
        width: 45vh;
    }
    

    /*질문*/
    .questionTitle{
        grid-row-start: 1;
        grid-row-end: 2;

        font-weight: bold;
        font-size: 18px;

    }
    .questionContent{
        grid-row-start: 2;
        grid-row-end: 3;

        font-weight: normal;
        font-size: 15px;
    }

    /*답변*/
    .responseTitle{
        grid-row-start:3;
        grid-row-end:4;

        font-weight: bold;
        font-size: 18px;
    }

    .response1{
        grid-row-start:4;
        grid-row-end:5;
        font-weight: normal;
        font-size: 15px;

        border-radius: 5px;
        border: solid 1px #028799;
        background-color: #FFFFFF;
        color: #028799;

        /*호버*/
        &:hover {
            background-color: #028799;
            color: white;
            opacity: 0.8;
        }
    }

    .checkedResponse1{
        grid-row-start:4;
        grid-row-end:5;
        font-weight: normal;
        font-size: 15px;

        background-color: #028799;
        color: white;

        border-radius: 5px;
    }

    .response2{
        grid-row-start:5;
        grid-row-end:6;
        font-weight: normal;
        font-size: 15px;

        border-radius: 5px;
        border: solid 1px #028799;
        background-color: #FFFFFF;
        color: #028799;

        /*호버*/
        &:hover {
            background-color: #028799;
            color: white;
            opacity: 0.8;
        }
    }

    .checkedResponse2{
        grid-row-start:5;
        grid-row-end:6;
        font-weight: normal;
        font-size: 15px;

        background-color: #028799;
        color: white;


        border-radius: 5px;
    }

    /*상태바*/
    .statusBar{
        grid-row-start: 6;
        grid-row-end: 7;    

        color: #002F5A;
    }

    /*다음 버튼*/
    .nextButtonFrame{
        grid-row-start: 7;
        grid-row-end: 8;
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
