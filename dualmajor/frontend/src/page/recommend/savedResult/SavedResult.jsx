import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Accordion, ListGroup} from 'react-bootstrap';
import RecommendService from '../../../services/recommend.service';
import { useNavigate } from 'react-router-dom';
//import ReactTooltip from 'react-tooltip';

export default function Result() {
    //상태값 정의
    const [thisResult, setThisResult] = useState(false); //백엔드로부터 받아올 데이터
    const [isError, setIsError] = useState(false); //결과 값이 에러인지 여부 저장
    const [answer, setAnswer] = useState(false); //사용자가 선택한 학문 설정
    const [testKey, setTestKey] = useState(false);

    //화면 이동 제어용 callback함수 정의
    let navigate = useNavigate();

    //초기 식별자 지정
    useEffect(() => {
        //테스트 키(식별자) 받기
        RecommendService.getTestKey().then(
            (response) => {
                setTestKey(response.data);
            }
        )
    },[])

    //이중전공 추천 결과 받아오기
    useEffect(() => {

        //임시 아이디 설정
        let departmentName = localStorage.getItem('recommendResult');

        //세션 스토리지에 저장된 결과값을 백엔드에 요청
        RecommendService.getDepartmentInfo(departmentName).then(
            (response) => {

                // console.log("getData:", response.data)

                //전달받은 값을 데이터로 저장
                setThisResult(response.data);
                //실행
                // ShowResult();
            }
        ).catch(
            (Error) => {
                //에러가 발생했음을 저장
                // setIsError(true);
            }
        )
        //테스트용
        //setThisResult(testData.info);
        //thisResult는 테스트 종료되면 삭제 처리

        ShowResult();
    },[testKey])

    useEffect(() => {
        ShowResult();
    },[thisResult])
    
    const ShowResult = () => {
        // console.log('thisResult:',thisResult);
        // console.log('testData.list.academicName:',thisResult[0]);

        if(!thisResult){
            return(
                <></>
            );
        }
        return(
            <>
                <Accordion defaultActiveKey="0" flush style={{width:"100%"}}>
                    {
                        //testData.info.map(thisData => (
                            <>
                                <Accordion.Item eventKey={thisResult.departmentName}>
                                    <Accordion.Header>{thisResult.departmentName}</Accordion.Header>
                                    <Accordion.Body>
                                    <ListGroup>
                                        {
                                            (thisResult.campus !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">캠퍼스</div><br/>
                                                {thisResult.campus}</ListGroup.Item>:
                                            <></>
                                        }
                                        {
                                            (thisResult.intro !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">학과소개</div><br/>
                                                {thisResult.intro}</ListGroup.Item>:
                                            <></>
                                        }
                                        {
                                            (thisResult.degree !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">졸업학위</div><br/>
                                                {thisResult.degree}</ListGroup.Item>:
                                            <></>
                                        }
                                        {
                                            (thisResult.career !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">진로</div><br/>
                                                {thisResult.career}</ListGroup.Item>:
                                            <></>
                                        }
                                        {
                                            (thisResult.curriculum !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">학과 커리큘럼</div><br/>
                                                {thisResult.curriculum}</ListGroup.Item>:
                                            <></>
                                        }
                                        {
                                            (thisResult.certification!== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">관련 자격증</div><br/>
                                                {thisResult.certification}</ListGroup.Item>:
                                            <></>                                                   
                                        }
                                        {
                                            (thisResult.webPage !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">홈페이지</div><br/>
                                                <a href={`${thisResult.webPage}`} target="_blank" rel="noreferrer">
                                                {thisResult.webPage}</a></ListGroup.Item>:
                                            <></>
                                        }
                                        {
                                            (thisResult.phoneNum !== null)?
                                            <ListGroup.Item>
                                                <div className="fw-bold">학과 사무실</div><br/>
                                                <a href={`tel:${thisResult.phoneNum}`}>
                                                    {thisResult.phoneNum}</a></ListGroup.Item>:
                                            <></>
                                        }
                                    </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </>
                
                    }
                </Accordion>
            </>
        )
    }

    const testAgain = () => {
        navigate("/recommend");
    }
 
  return (
    <BodyBlock>
        <div className="container">
            <div className='notice'>
                <span><b>!!이중전공 추천 서비스 결과!!</b></span><br/>
            </div>
            <div className='resultFrame'>
                {
                    !thisResult?
                    <></>:
                    <ShowResult/>  
                }
            </div>
            <div className='nextButtonFrame'>
            <Button className='nextButton' onClick={testAgain}>다시 테스트하기</Button>
            </div>
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
        
        
        /*vertical-align: middle;*/
        row-gap: 10px;

        // height: 70vh;
        width: 45vh;
    }
    

    /*안내문구*/
    .notice{
        grid-row-start: 1;
        grid-row-end: 2;

        /*grid-template-rows: repeat(auto-fit, minmax(300px, auto));*/

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
        /*grid-template-rows: repeat(auto-fit, minmax(300px, auto));*/

        //가운데 정렬용 선언
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        .eachResult:nth-child(odd){

            background-color: #002F5A;
            opacity: 0.8;
        
            /*모양*/
            border-radius: 5px;
            height: 3em;
            width: 50%;
        
            /*글씨*/
            font-size: 14px;
            color: white;
            font-weight: bold;
            padding-top: 10px;
    
            /*호버*/
            &:hover {
                background-color: #002F5A;
                opacity: 1;
            }
        }

        .eachResult:nth-child(even){

            background-color: #028799;
            opacity: 0.8;
        
            /*모양*/
            border-radius: 5px;
            height: 3em;
            width: 50%;
        
            /*글씨*/
            font-size: 14px;
            color: white;
            font-weight: bold;
            padding-top: 10px;
    
            /*호버*/
            &:hover {
                background-color: #028799;
                opacity: 1;
            }
        }
    }

   
    /*다음 버튼*/
    .nextButtonFrame{
        grid-row-start: 3;
        grid-row-end: 4;
        /*grid-template-rows: repeat(auto-fit, minmax(300px, auto));*/

        //가운데 정렬용 선언
        display: flex;
        justify-content: center;
        align-items: center;

        .nextButton{

            background-color: #002F5A;
            opacity: 0.8;
        
            /*모양*/
            border-radius: 5px;
            width: 70%;
        
            /*글씨*/
            font-size: 14px;
            color: white;
            font-weight: bold;
    
            /*호버*/
            &:hover {
                background-color: #002F5A;
                opacity: 1;
            }
        }
    }
`