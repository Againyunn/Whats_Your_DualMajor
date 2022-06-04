//메인 프레임(틀) component
import React from 'react'
import styled from 'styled-components'
import ReactTypingEffect from 'react-typing-effect';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function MainFrame() {

    //화면 이동 제어용 callback함수 정의
    let navigate = useNavigate();

    //이중전공 추천 서비스로 이동
    const moveToRecommend = () => {
        //question page로 이동
        navigate("/recommend");
        window.location.reload();
    }

    //예상경쟁률 서비스로 이동
    const moveToRate = () => {
        //RateMain으로 이동
        navigate("/rate");
        window.location.reload();
    }

    //전체학과 정보 조회페이지로 이동
    const moveToMajorDetail = () => {
        navigate("/seoulMajorInfo");
        window.location.reload();
    }

    //내가 찜한 학과 조회페이지로 이동
    const moveToMyMajorInfo = () => {
        navigate("/showMyMajorInfo");
        window.location.reload();
    }

    return (
    <>
        <BodyBlock>
            <div className='container'>
                <div className='choose'>
                    <ChooseBlock>
                        <div className='containerFlex'>
                            <div className='recommend' onClick={moveToRecommend}><img src={require('../../../media/tab/백이중추천.png')} alt="추천"/><br/><br/><span>이중전공 추천</span></div>
                            <div className='compete' onClick={moveToRate}><img src={require('../../../media/tab/백경쟁률.png')} alt="추천"/><br/><br/><span>&nbsp;예상 경쟁률&nbsp;</span></div>
                        </div>
                    </ChooseBlock>
                </div>
                <div className='write' onClick={moveToMajorDetail}>전체 학과 알아보기</div>
                <div className='review' onClick={moveToMyMajorInfo}>내가 찜한 학과</div>
                <div className='notice'>
                    <span><b>공지사항</b></span>

         
                </div>
            </div>
        </BodyBlock>
    </>
  )
}
 //CSS
 const BodyBlock = styled.div`
 div.container{
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

 /*상단 배너*/
 

 /*이중전공 추천 & 예상 경쟁률*/
 div.choose{
     grid-row-start: 0;
     grid-row-start: 1;

     grid-template-rows: repeat(auto-fit, minmax(300px, auto));
 }

 /*우리학과 자랑하기*/
 div.write{
     grid-row-start: 1;
     grid-row-start: 2;
     grid-template-rows: repeat(auto-fit, minmax(300px, auto));

     /*색*/
     background-color: #875100;
     opacity: 0.57;

     /*모양*/
     border-radius: 10px;
     

     /*글씨*/
     padding-top: 3%;
     font-size: 20px;
     color: white;
     font-weight: bold;

     /*호버*/
     &:hover {
         background-color: #875100;
         opacity: 0.67;
       }
 }

 /*학우들의 생생후기*/
 div.review{
     grid-row-start: 2;
     grid-row-start: 3;    

     /*색*/
     background-color: #875100;
     opacity: 0.8;

     /*모양*/
     border-radius: 10px;

     /*글씨*/
     padding-top: 3%;
     font-size: 20px;
     color: white;
     font-weight: bold; 
     
     /*호버*/
     &:hover {
         background-color: #875100;
         opacity: 0.9;
       }
 }

 /*공지사항*/
 div.notice{
     grid-row-start: 3;
     grid-row-start: 4;

     /*색*/
     background-color: white;
     border: solid 1px #5a5a5a;

     /*모양*/
     border-radius: 10px;

     /*글씨*/
     font-size: 15px;
     color: #5a5a5a;
     font-weight: normal;
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