import React, { useEffect, useState } from 'react'
import Header from '../../main/component/Header';
import MainFrame from './MainFrame';
import Footer from '../../main/component/Footer';
import '../../../media/css/commonFrame.css';
import Question from './Question';
import RecommendService from '../../../services/recommend.service';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row, ProgressBar } from 'react-bootstrap';
import styled from 'styled-components'

export default function QuestionFrame() {

    //상단바 컨트롤 : 메뉴바 노출 상태관리
    const showMenu = false;

    //하단바 컨트롤 : 
    const showPrev = false;
    const showNext = false;
    const showDev = false;

    //테스트용
    // let questionNum=1;
    // let totalQuestionNum=8;
    // let questionContent="전공에 대해 이론 자체만으로도 의미가 있다고 생각하나요? 혹은 실용적인 것만 의미가 있다고 생각하나요?";
    // let response1="이론만으로도 의미가 있어요.";
    // let response2="실용적이어야 해요.";

    //화면 이동 제어용 callback함수 정의
    let navigate = useNavigate();

    //질문 값 제어 상태 관리
    const[questionNum, setQuestionNum] = useState(1);
    const[totalQuestionNum, setTotalQuestionNum] = useState('');
    const[questionId, setQuestionId] = useState(1);
    const[questionContent, setQuestionContent] = useState('');
    const[response1, setResponse1] = useState('');
    const[response2, setResponse2] = useState('');
    const[progressPercent, setProgressPercent] = useState(10);
    const[validateTest, setValidateTest] = useState(null);
    const[questionChange, setQuestionChange] = useState(0);

    //상태값 및 변수 정의
    const [thisAnswer, setThisAnswer] = useState(false);

    //초기 화면 랜더링 시 초기화(1번 실행)
    //백엔드로부터 질문 데이터 받아오기
    useEffect(() => {
        //정상적인 방법으로 테스트를 하는 지 검증
        setValidateTest(localStorage.getItem('recommendTest'));
        let firstValidate = localStorage.getItem('recommendTest');
        
        //테스트
        // console.log("localStorage.getItem('recommendTest')", localStorage.getItem('recommendTest'));
        // console.log('validateTest',validateTest);
        // console.log('firstValidate', firstValidate);

        //비정상적인 방법으로 테스트 접근 시 이중전공 추천 서비스 첫 화면으로 강제 이동
        if(!firstValidate){
            alert("처음부터 테스트를 진행해주세요😁");

            //recommend page로 이동
            navigate("/recommend");
            window.location.reload();
        }


        let thisQuestionNum = localStorage.getItem("questionNum");

        //질문받아오기
        RecommendService.getFirstSectionQuestion(thisQuestionNum).then(
            (response) => {
                console.log("thisData", response.data);
                console.log("thisData Type:", typeof(response.data));

                //현재 상태(질문)값 변경
                setQuestionNum(response.data.questionNum);
                setTotalQuestionNum(response.data.totalQuestionNum);
                setQuestionId(response.data.questionId);
                setQuestionContent(response.data.questionContent);
                setResponse1(response.data.response1);
                setResponse2(response.data.response2);
            }
        )

        setProgressPercent(Math.round(questionNum/totalQuestionNum *100)); //진행척도를 나타내기 위한 변수

    },[])

    //질문 순서 값이 변경되었는 지 확인 후, 다음 질문 랜더링
    useEffect(() => {
        //질문받아오기

        RecommendService.getFirstSectionQuestion(questionNum).then(
            (response) => {

                //1차 결과(학문별 선택창)인지 식별
                if(response.data.questionId === "result"){
                    //1차 결과 page로 이동
                    navigate("/result1");
                    window.location.reload();
                }
                
                //현재 상태(질문)값 변경
                setQuestionNum(response.data.questionNum);
                setTotalQuestionNum(response.data.totalQuestionNum);
                setQuestionId(response.data.questionId);
                setQuestionContent(response.data.questionContent);
                setResponse1(response.data.response1);
                setResponse2(response.data.response2);
            }
        )

        setProgressPercent(Math.round(questionNum/totalQuestionNum *100)); //진행척도를 나타내기 위한 변수
    },[questionChange])


    //답변에 따라 값 변경
    const checkAnswer = (type) =>{
        if(type === 1){
            setThisAnswer('1');
        }

        else if(type === 2){
            setThisAnswer('2');
        }
    }


    const goToNext = () => {
        //사용자가 값을 선택했을 경우에만 선택값을 백엔드로 전송
        if(!thisAnswer === false){
            //API전송
            RecommendService.submitFirstSectionAnswer(questionNum, questionId, thisAnswer);

            //다음질문을 받을 수 있도록 세션스토리지 값 변경
            let nextQuestionNum = questionNum + 1;
            localStorage.setItem('questionNum', nextQuestionNum);
            setQuestionChange(nextQuestionNum);
        }
    }


    return (
        <>
        <div className="mainContainer">
            <div className="header"><Header showMenu={showMenu}/></div>
            <div className="mainBody">
                <BodyBlock>
                    <div className='container'>

                        <div className='questionTitle'>질문</div>
                        <div className='questionContent'>{questionContent}</div>
                        <br/>

                        <div className='responseTitle'>답변</div>
                        {
                            thisAnswer === '1'?
                            <Button className='checkedResponse1' >{response1}</Button>:
                            <Button className='response1' onClick={()=> checkAnswer(1)}>{response1}</Button>
                        }
                        
                        {
                            thisAnswer === '2'?
                            <Button className='checkedResponse2' >{response2}</Button>:
                            <Button className='response2' onClick={()=> checkAnswer(2)}>{response2}</Button>
                        }

                        <div className='statusBar'>
                            <ProgressBar striped variant="success" animated now={progressPercent} />
                        </div>
                    
                        <div className='nextButtonFrame'>
                            <Button className='nextButton' onClick={() => goToNext()}>다음</Button>
                        </div>
                    </div>
                </BodyBlock>

            </div>
            <div className="footer"><Footer showPrev={showPrev} showNext={showNext} showDev={showDev}/></div>
        </div>
        </>
    );
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