import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Accordion} from 'react-bootstrap';
import RecommendService from '../../../services/recommend.service';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import Swal from 'sweetalert2'   
// import ReactTooltip from 'react-tooltip';

export default function Result() {
    //상태값 정의
    const [thisResult, setThisResult] = useState(false); //백엔드로부터 받아올 데이터
    const [isError, setIsError] = useState(false); //결과 값이 에러인지 여부 저장
    const [answer, setAnswer] = useState(false); //사용자가 선택한 학문 설정

    //테스트용
    // let testData = {
    //     "list":[
    //         {
    //             "academicName":"공과대학",
    //             "departmentList":"AI전공,컴퓨터공학부,산업경영공학과,전자공학과,정보통신공학과"
    //         },
    //         {
    //             "academicName":"사회과학대학",
    //             "departmentList": "경영학부, 국제학부, 국제통상학과, 경제학과, 국제금융학과, 미디어커뮤니케이션학과, 광고pr학과, 문화콘텐츠전공, GBT학부"
    //         }
    //     ]
    // }

    //화면 이동 제어용 callback함수 정의
    let navigate = useNavigate();




    useEffect(() => {
        //임시 아이디 설정
        let testKeyValidate = sessionStorage.getItem('testKey');
        let resultType = sessionStorage.getItem('result1Type');

        // 세션 스토리지에 저장된 결과값을 백엔드에 요청
        RecommendService.getFirstSectionResult(resultType, testKeyValidate).then(
            (response) => {

                // console.log("getData:", response.data)

                //테스트 사용자 식별용 세션 셋팅
                sessionStorage.setItem('testKey', response.data.testKey);

                // console.log("response.data.list",response.data.list);

                //전달받은 값을 데이터로 저장
                setThisResult(response.data.list);
                //실행
                //ShowResult();
            }
        ).catch(
            (Error) => {
                //에러가 발생했음을 저장
                setIsError(true);
                
            }
        )

        //테스트용(시작)
        //setThisResult(testData.list);
        //thisResult는 테스트 종료되면 삭제 처리
        
        ShowResult();
    },[])


    // useEffect(() => {
    //     ShowResult();
    // },[thisResult])


    const ShowResult = () => {
        // console.log('thisResult:',thisResult);
        // console.log('testData.list.academicName:',thisResult[0]);
        // console.log('testData.list.academicName:',testData.list[0]);

        if(!thisResult){
            return;
        }

        return(
            <>
                <Accordion style={{width: "90%"}}>
                    {
                        //testData.list.map(thisData => (
                        thisResult.map(thisData => (
                            <>
                                <Accordion.Item eventKey={thisData.academicName}>
                                    <div id={`${thisData.academicName}`} onClick={selectResult}>
                                        <Accordion.Header>{thisData.academicName}</Accordion.Header>
                                    </div>
                                    <Accordion.Body>
                                        {thisData.departmentList}
                                        {/* <ListGroup>
                                            <ListGroup.Item>{thisData.departmentList}</ListGroup.Item>
                                        </ListGroup> */}
                                    {/* <div className='eachResult' key={thisData.academicName} data-tip data-for={`tooltip${thisData.academicName}`} onClick={()=>{selectAcademicName(thisData.academicName)}}>
                                        
                                            {thisData.academicName}
                                        
                                            <ReactTooltip
                                                id={`tooltip${thisData.academicName}`}
                                                effect="solid"
                                                place="bottom"
                                                type="dark"
                                                key={thisData.departmentList}
                                                >
                                                {thisData.departmentList}
                                            </ReactTooltip>
                                    </div> */}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </>
                        ))
                    }
                </Accordion>
            </>
        )
    }

    const selectResult =(event) =>{
        let result = event.currentTarget.id;

        // console.log("thisAcademicName:",result);
        setAnswer(result);


        //선택한 전공에 대해 색 변경(프론트에 표시)
        document.getElementById(result).style.border = "1px solid #002F5A";
        document.getElementById(result).style.color = "white";
    }
 
    
    const goToNext = () => {
        //사용자가 값을 선택했을 경우에만 선택값을 백엔드로 전송
        if(answer !== false){
            //임시 아이디 설정
            let testKeyValidate = sessionStorage.getItem('testKey');

            //API전송
            RecommendService.submitFirstSectionResult(answer, testKeyValidate).then(
                (response) => {
                    sessionStorage.setItem('recommendFirstResult', true);
                    sessionStorage.setItem('questionNum', 1);
        
                    //2차 질문 page로 이동
                    navigate("/question2");
                    window.location.reload();
                }
            );
            // console.log("answer:",answer);

        }
        else{
            Swal.fire({
                text: "섹터를 선택해주세요😉",
                icon: undefined,
                confirmButtonText: '확인',
                confirmButtonColor: '#002F5A'
              });
        }
    }



  return (
    <BodyBlock>
        <div className="container">
            <div className='notice'>
                <span>공부하고 싶은 학문 섹터 1개를 골라주세요!</span><br/>
                <span>선택 섹터에 따라 최종결과가 달라질 수 있어요.</span>
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
            {
                !isError?
                <Button className='nextButton' onClick={() => goToNext()}>다음</Button>:
                <></>
            }
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

        height: 70vh;
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