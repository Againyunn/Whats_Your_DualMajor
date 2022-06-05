//메인 프레임(틀) component
import React, { useEffect } from 'react'
import styled from 'styled-components'
// import ReactTypingEffect from 'react-typing-effect';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'   

export default function MainFrame() {

    //화면 이동 제어용 callback함수 정의
    let navigate = useNavigate();

    //초기 화면 랜더링 시 초기화(1번 실행)
    useEffect( () =>{
        //recommendTest : 정상적인 방법으로 테스트를 처음부터 시작했는 지 검증하기 위한 값(url을 통한 비정상적 접근 방지)
        sessionStorage.setItem('recommendTest', 'true');

        //questionNum : 몇 번째 질문인지 식별할 수 있게하는 변수
        sessionStorage.setItem('questionNum', 0);
    },[])



    const moveToQuestion = () => {

        //question page로 이동
        navigate("/question1");
        // window.location.reload();
    }

    return (
    <>
        <BodyBlock>
            <div className='container'>
                <div className='ShowFrame'>
                    <img src={require('../../../media/major/aniMajor.gif')} alt='학과별 로고'/>
                </div>
                <div className='startFrame'>
                    <Button className='startButton' onClick={moveToQuestion}>시작하기</Button>
                </div>
                <div className='notice'>
                    <span>신중하게 선택해주세요.</span><br/>
                    <span>테스트 중 '뒤로가기' 불가합니다!</span><br/>
                    
                </div>
            </div>
        </BodyBlock>
    </>
  )
}

//CSS
const BodyBlock = styled.div`
    .container{
        display: grid;
        grid-template-rows: 3fr 1fr 1fr 5fr;
        background-color: white;
        text-align: center;
        /*justify-content: center;*/
        
        
        vertical-align: middle;
        row-gap: 10px;

        height: 70vh;
        width: 45vh;
    }
    

    /*전공 gif창*/
    .ShowFrame{
        gird-row-start: 0;
        grid-row-start: 1;

        grid-template-rows: repeat(auto-fit, minmax(300px, auto));

        display: flex;
        justify-content: center;
        align-items: center;

        /*모양*/
        border-radius: 10px;
        
        /*색*/
        background-color: #002F5A;
        opacity: 0.8;


        img{
            width: 70%;
            border-radius: 10px;
            // vertical-align: middle;        
        }
    }

    /*gif 이미지*/
    .gifFrame{
        width: 150px;
    }

 /*시작하기*/
    .startFrame{
        gird-row-start: 2;
        grid-row-start: 3;
        grid-template-rows: repeat(auto-fit, minmax(300px, auto));

        //가운데 정렬용 선언
        display: flex;
        justify-content: center;
        align-items: center;

        .startButton{

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
    


 /*안내문구*/
 .notice{
     gird-row-start: 3;
     grid-row-start: 4;    

     /*글씨*/
     padding-top: 3%;
     font-size: 15px;
     color: #5a5a5a;
     opacity: 1;
 }
`


const ChooseBlock = styled.div`
 div.containerFlex{
     min-height: 24vh;
     display: flex;
     flex-direction: row;
     flex-wrap: nowrap;
     align-items: stretch;
     background-color: white;

 }

 div.recommend{
     flex-grow: 1;
     align-self: stretch;

     /*색*/
     background-color: #002F5A;
     opacity: 0.8;

     /*모양*/
     margin-right: 5px;
     border-radius: 10px;

     /*글씨*/
     padding-top: 10%;
     font-size: 19.5px;
     color: white;
     font-weight: bold;

     /*호버*/
     &:hover {
         background-color: #002F5A;
         opacity: 0.9;
       }

     /*이미지*/
     img{
         width: 45px;
         height: 45px;
     }
 }

 div.compete{
     flex-grow: 1;
     align-self: stretch;
     
     /*색*/
     background-color: #028799;
     opacity: 0.9;

     /*모양*/
     margin-left: 5px;
     border-radius: 10px;

     /*글씨*/
     padding-top: 10%;
     font-size: 19.5px;
     color: white;
     font-weight: bold;

     /*호버*/
     &:hover {
         background-color: #028799;
         opacity: 1;
       }
     
     /*이미지*/
     img{
         width: 45px;
         height: 45px;
     }
 }
`



// const BodyBlock = styled.div`
//         div.container{
//             display: grid;
//             gird-template-columns: 1fr 5fr 1fr 5fr 1fr;
//             grid-template-rows: 1fr 4fr 1fr 2fr 1fr 2fr 1fr 5fr 1fr;
//             background-color: white;
//             width:100%;
//             height: 100%;

//         }

//         /*이중전공 추천*/
//         div.recommend{
//             gird-column-start: 2;
//             grid-column-end: 3;
//             gird-row-start: 2;
//             grid-row-start: 3;

//             /*색*/
//             background-color: 002F5A;

//             /*모양*/
//             border-radius: 10px;

//             /*글씨*/
//             font-size: 25px;
//             color: white;
//             font-weight: bold;
//         }

//         /*예상 경쟁률*/
//         div.compete{
//             gird-column-start: 4;
//             grid-column-end: 5;
//             gird-row-start: 2;
//             grid-row-start: 3;

//             /*색*/
//             background-color: 028799;

//             /*모양*/
//             border-radius: 10px;

//             /*글씨*/
//             font-size: 25px;
//             color: white;
//             font-weight: bold;
//         }

//         /*우리학과 자랑하기*/
//         div.write{
//             gird-column-start: 2;
//             grid-column-end: 5;
//             gird-row-start: 4;
//             grid-row-start: 5;

//             /*색*/
//             background-color: 875100;

//             /*모양*/
//             border-radius: 10px;

//             /*글씨*/
//             font-size: 25px;
//             color: white;
//             font-weight: bold;
//         }

//         /*학우들의 생생후기*/
//         div.review{
//             gird-column-start: 2;
//             grid-column-end: 5;
//             gird-row-start: 6;
//             grid-row-start: 7;    

//             /*색*/
//             background-color: 875100;

//             /*모양*/
//             border-radius: 10px;

//             /*글씨*/
//             font-size: 25px;
//             color: white;
//             font-weight: bold;  
//         }

//         /*공지사항*/
//         div.notice{
//             gird-column-start: 2;
//             grid-column-end: 5;
//             gird-row-start: 8;
//             grid-row-start: 9;

//             /*색*/
//             background-color: white;
//             border: solid 1px C4C4C4;

//             /*모양*/
//             border-radius: 10px;

//             /*글씨*/
//             font-size: 15px;
//             color: C4C4C4;
//             font-weight: normal;
//         }
        
//     `