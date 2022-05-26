import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Button,  Modal, Row, Col, Container, ProgressBar, Accordion, ListGroup, InputGroup, FormControl} from 'react-bootstrap';
import RecommendService from '../../../services/recommend.service';
import { useNavigate } from 'react-router-dom';
//import ReactTooltip from 'react-tooltip';

export default function Result() {
    //상태값 정의
    const [thisResult, setThisResult] = useState(false); //백엔드로부터 받아올 데이터
    const [isError, setIsError] = useState(false); //결과 값이 에러인지 여부 저장
    const [answer, setAnswer] = useState(false); //사용자가 선택한 학문 설정


    //만족도 조사 변수
    const [modalShow, setModalShow] = useState(false); //모달을 통해 만족도 수집
    const [satisfyingStar, setSatisfyingStar] = useState(1); //별점
    const [reviewContent, setReviewContent] = useState("");//간략후기

    //테스트용
    // let testData = {
    //     "info": [
    //         {
    //             "departmentName": "경영",
    //             "campus": "서울",
    //             "intro": "inf1",
    //             "degree": "deg1",
    //             "career": "career1",//null가능
    //             "curriculum": "경영학원론",//null가능
    //             "certification": "전산회계",//null가능
    //             "webPage": "www.hufs.ac.kr" //null가능
    //         },
    //         {
    //             "departmentName": "국금",
    //             "campus": "글로벌",
    //             "intro": "inf2",
    //             "degree": "deg2",
    //             "career": "career2",
    //             "curriculum": "경제학원론",//null가능
    //             "certification": null,//null가능
    //             "webPage": "www.hufs.ac.kr스위스 다보스에서 열린 세계경제포럼 연차총회(WEF·다보스포럼)에서는 비트코인 등 가상화폐를 둘러싼 비관적인 전망도 쏟아졌다. 글로벌 자산운용사 구겐하임인베스트먼트의 스콧 마이너드 최고투자책임자(CIO)는 비트코인이 8000달러까지 폭락할 수 있다고 경고했다. 현 시세에서 70% 이상 추가 폭락할 수 있다는 것이다."
    //         }
    //     ]
    // }

    //화면 이동 제어용 callback함수 정의
    let navigate = useNavigate();


    useEffect(() => {
        //임시 아이디 설정
        let testKeyValidate = sessionStorage.getItem('testKey');

        //세션 스토리지에 저장된 결과값을 백엔드에 요청
        RecommendService.getFirstSectionResult(sessionStorage.getItem('result2Type'), testKeyValidate).then(
            (response) => {


                //전달받은 값을 데이터로 저장
                setThisResult(JSON.parse(response.data.info));
                //실행
                ShowResult();
            }
        ).catch(
            (Error) => {
                //에러가 발생했음을 저장
                setIsError(true);
            }
        )

        //테스트용
        //setThisResult(testData.info);
        //thisResult는 테스트 종료되면 삭제 처리

        ShowResult();
    },[])

    

    const ShowResult = () => {
        console.log('thisResult:',thisResult);
        console.log('testData.list.academicName:',thisResult[0]);

        if(!thisResult){
            return(
                <></>
            );
        }

        return(
            <>
                <Accordion defaultActiveKey="0" flush>
                    {
                        //testData.info.map(thisData => (
                        thisResult.info.map(thisData => (
                            <>
                                <Accordion.Item eventKey={thisData.departmentName}>
                                    <div id={`${thisData.departmentName}`} onClick={selectResult}>
                                        <Accordion.Header>{thisData.departmentName}</Accordion.Header>
                                    </div>
                                    <Accordion.Body>
                                        <ListGroup>
                                            <ListGroup.Item>{thisData.campus}</ListGroup.Item>
                                            <ListGroup.Item>{thisData.intro}</ListGroup.Item>
                                            <ListGroup.Item>{thisData.degree}</ListGroup.Item>
                                                {
                                                    (thisData.career !== null)?
                                                    <ListGroup.Item>{thisData.career}</ListGroup.Item>:
                                                    <></>
                                                }
                                                {
                                                    (thisData.curriculum !== null)?
                                                     <ListGroup.Item>{thisData.curriculum}</ListGroup.Item>:
                                                     <></>
                                                }
                                                {
                                                    (thisData.certification!== null)?
                                                    <ListGroup.Item>{thisData.certification}</ListGroup.Item>:
                                                    <></>                                                   
                                                }
                                                {
                                                    (thisData.webPage !== null)?
                                                    <ListGroup.Item>{thisData.webPage}</ListGroup.Item>:
                                                    <></>
                                                }
                                        </ListGroup>
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
        // let result = selectedElement.current.id;

        console.log("selectedResult:",result);
        setAnswer(result);

        //선택한 전공에 대해 색 변경(프론트에 표시)
        document.getElementById(result).style.border = "1px solid #002F5A";
        document.getElementById(result).style.color = "white";
    }

    const saveData = () => {
        //사용자가 값을 선택했을 경우에만 선택값을 백엔드로 전송
        if(answer !== false){
            //임시 아이디 설정
            let testKeyValidate = sessionStorage.getItem('testKey');

            //로그인 정보 받아오기
            let thisUser = sessionStorage.getItem("user");

            //API전송
            RecommendService.saveResult(answer, thisUser ,testKeyValidate);
            console.log("answer:",answer);

            //비회원이 차후에 회원가입 시 기존의 서비스 정보를 받을 수 있도록
            localStorage.setItem('recommendResult', answer);

            alert("저장되었습니다.");

            //서비스 만족도 조사 모달 띄우기

            //서비스 만족도 조사 이후 공유하기 활성화
        }
    }

 
    function SatisfactionModal(props) {
    
        const Star = () => {
            const drawStar = (e) => {
                document.getElementById("realStar").style.width = `${e.target.value * 10}%`;
                // document.querySelector(`.star span`).style.width = `${e.target.value * 10}%`;
        
                //별점 기록
                //s/etSatisfyingStar(e.target.value);
        
            }

          return (
            <>
                <StarFrame >
                    <label>
                        <span class="star">
                            ★★★★★
                            <span id="realStar">★★★★★</span>
                                <input type="range" onChange={drawStar} value="1" step="1" min="0" max="10"/>
                        </span>
                    </label>
                </StarFrame>
            </>
          )
        }


        const briefReview = (e) => {
          let thisReview = e.target.value;
          setReviewContent(thisReview);
        }
      
        return (
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" >
                    <Container>
                    <Row>
                        <Col md={12} xs={12} >
                        <h6><b>저희 서비스 어떠셨어요?</b></h6>
                        </Col>
                    </Row>
                    </Container>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                <Container>
                    <Row>
                    <Col xs={12} md={12}>
                        <small><b>만족도 별점</b></small>
                    </Col>
                    <Col xs={12} md={12}>
                        <Star/>
                    </Col>
        
                    <Col xs={12} md={12}>
                        <small><b>간략 후기</b></small>
                    </Col>
                    <Col xs={12} md={12}>
                        <InputGroup>
                            <FormControl onChange={() => briefReview()}  aria-label="Username"  aria-describedby="basic-addon1"  placeholder="좋았던점이나 개선하면 좋을 것들 적어주세요😉"></FormControl>
                        </InputGroup>
                    </Col>
                        
                    <PersonalButton>
                        <Col xs={12} md={12}>
                        <br/>
                        <Button className='recommend' onClick={saveData}>저장하기</Button>
                        </Col>
        
                        <Col xs={12} md={12}>
                        <Button className='compete'>공유하기</Button>
                        </Col>
        
                    </PersonalButton>
                    </Row>
        
                </Container>
                </Modal.Body>
            </Modal>
        )
      }


  return (
    <BodyBlock>
        <div className="container">
            <div className='notice'>
                <span><b>!!이중전공 추천 서비스 결과!!</b></span><br/>
                <span>학과를 선택한 뒤 저장을 누르시면 sns에 공유할 수 있어요~</span>
            </div>
            <div className='resultFrame'>
                {
                    !thisResult?
                    <></>:
                    <ShowResult/>  
                }
            </div>
            <div className='nextButtonFrame'>
            <Button className='nextButton' onClick={()=> setModalShow(true)}>저장하기</Button>
            </div>
        </div>
        <SatisfactionModal show={modalShow} onHide={() => setModalShow(false)} />
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

const StarFrame =styled.div`
    .star {
        position: relative;
        font-size: 2rem;
        color: #ddd;

        input {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            opacity: 0;
            cursor: pointer;
        }

        span {
            width: 0;
            position: absolute; 
            left: 0;
            color: #002F5A;
            overflow: hidden;
            pointer-events: none;
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