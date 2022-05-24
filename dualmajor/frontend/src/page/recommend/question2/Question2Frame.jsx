import React, { useEffect, useState } from 'react'
import Header from '../../main/component/Header';
// import MainFrame from './MainFrame';
import Footer from '../../main/component/Footer';
import '../../../media/css/commonFrame.css';
import RecommendService from '../../../services/recommend.service';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row, ProgressBar } from 'react-bootstrap';
import styled from 'styled-components'

export default function Question2Frame() {

    //상단바 컨트롤 : 메뉴바 노출 상태관리
    const showMenu = false;

    //하단바 컨트롤 : 
    const showPrev = false;
    const showNext = false;
    const showDev = false;

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
    const[nextQuestionNum, setNextQuestionNum] = useState(1);
    //const[questionChange, setQuestionChange] = useState(0);
    const[id, setId] = useState("");

    //상태값 및 변수 정의
    const [thisAnswer, setThisAnswer] = useState(false);

    //초기 화면 랜더링 시 초기화(1번 실행)
    //백엔드로부터 질문 데이터 받아오기
    useEffect(() => {
        //정상적인 방법으로 테스트를 하는 지 검증
        //setValidateTest(localStorage.getItem('recommendFirstResult'));
        let firstValidate = sessionStorage.getItem('recommendFirstResult');
        //임시 아이디 설정
        let idValidate = sessionStorage.getItem('testId');

        //비정상적인 방법으로 테스트 접근 시 이중전공 추천 서비스 첫 화면으로 강제 이동
        if(!firstValidate || !idValidate){
            alert("처음부터 테스트를 진행해주세요😁");

            //recommend page로 이동
            navigate("/recommend");
            window.location.reload();
        }

        //테스트 시작
        let thisQuestionNum = sessionStorage.getItem("questionNum");

        //질문받아오기
        RecommendService.getSecondSectionQuestion(id, thisQuestionNum).then(
            (response) => {
                console.log("thisData", response.data);
                console.log("thisData Type:", typeof(response.data));

                //현재 상태(질문)값 변경
                setQuestionNum(response.data.questionNum);
                setTotalQuestionNum(response.data.totalQuestionNum);
                setQuestionContent(response.data.questionContent);
                setResponse1(response.data.response1);
                setResponse2(response.data.response2);
            }
        )

        // //테스트용
        // // setQuestionNum(3);
        // setTotalQuestionNum(8);
        // setQuestionId(101);
        // setQuestionContent("당신은 전공을 선택할 때 개인의 성향과 진로 중 무엇을 더 중시하나요?");
        // setResponse1("개인성향이 중요해요.");
        // setResponse2("진로나 직업이 더 중요해요.");
        // setProgressPercent(1/8*100);


        setProgressPercent(Math.round(nextQuestionNum/totalQuestionNum *100)); //진행척도를 나타내기 위한 변수

    },[])

    //질문 순서 값이 변경되었는 지 확인 후, 다음 질문 랜더링
    useEffect(() => {
        //질문받아오기

        RecommendService.getSecondSectionQuestion(id, nextQuestionNum).then(
            (response) => {

                
                //현재 상태(질문)값 변경
                setQuestionNum(response.data.questionNum);
                setTotalQuestionNum(response.data.totalQuestionNum);
                setQuestionContent(response.data.questionContent);
                setResponse1(response.data.response1);
                setResponse2(response.data.response2);
            }
        )

        setProgressPercent(Math.round(nextQuestionNum/totalQuestionNum *100)); //진행척도를 나타내기 위한 변수
    },[nextQuestionNum])


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
        if(thisAnswer !== false){
            //API전송
            RecommendService.submitSecondSectionAnswer(id, nextQuestionNum, thisAnswer).then(
                (response) => {
                    if(response.data.finished != false){
                        //결과로 받아올 값을 세션스토리지에 저장
                        sessionStorage.setItem('result2Type',response.data.questionId)
                                            
                        //1차 결과 page로 이동
                        navigate("/result1");
                        window.location.reload();
                    }
                }
            );

            //다음질문을 받을 수 있도록 세션스토리지 값 변경
            setNextQuestionNum(nextQuestionNum+1);
            //setQuestionChange(nextQuestionNum);

            //테스트용
            // setQuestionNum(3);
            // setTotalQuestionNum(8);
            // setQuestionId(101);
            // setQuestionContent("당신은 수학적인 계산이나 통계 분석을 즐기거나 잘하는 편인가요?");
            // setResponse1("네. 좋아하거나 잘해요.");
            // setResponse2("아니오. 좋아하거나 잘하지 않아요.");
            // setProgressPercent(2/8*100);
            setThisAnswer(false);
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
    .nextButtonFrame{Frame
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