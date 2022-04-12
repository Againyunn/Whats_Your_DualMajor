import React from 'react'
import Header from '../../main/component/Header';
import MainFrame from './MainFrame';
import Footer from '../../main/component/Footer';
import '../../../media/css/commonFrame.css';
import Question from './Question';

export default function QuestionFrame() {

    //상단바 컨트롤 : 메뉴바 노출 상태관리
    const showMenu = false;

    //하단바 컨트롤 : 
    const showPrev = false;
    const showNext = false;
    const showDev = false;

    //테스트용
    let questionNum=1;
    let totalQuestionNum=8;
    let questionContent="전공에 대해 이론 자체만으로도 의미가 있다고 생각하나요? 혹은 실용적인 것만 의미가 있다고 생각하나요?";
    let response1="이론만으로도 의미가 있어요.";
    let response2="실용적이어야 해요.";


    return (
        <>
        <div className="mainContainer">
            <div className="header"><Header showMenu={showMenu}/></div>
            <div className="mainBody">
                <Question questionNum={questionNum} totalQuestionNum={totalQuestionNum} questionContent={questionContent} response1={response1} response2={response2} /> 

            </div>
            <div className="footer"><Footer showPrev={showPrev} showNext={showNext} showDev={showDev}/></div>
        </div>
        </>
    );
}
