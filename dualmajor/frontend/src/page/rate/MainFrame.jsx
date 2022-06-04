//메인 프레임(틀) component
import React, { useEffect } from 'react'
import styled from 'styled-components'
import ReactTypingEffect from 'react-typing-effect';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function 
MainFrame() {

    //화면 이동 제어용 callback함수 정의
    let navigate = useNavigate();

    const moveToSeoul = () => {
        //SeoulMain으로 이동
        navigate("/seoul");
        window.location.reload();
    }
 
    const moveToGlobal = () => {
        //GlobalMain으로 이동
        navigate("/global");
        window.location.reload();
    }

  return (
    <>
    <BodyBlock>
        <div className='container'>
            <div className='choose'>
                <ChooseBlock>
                    <div className='containerFlex'>
                        <div className='recommend' onClick={moveToSeoul}><img src={require('../../media/structure/본관.jpg')} alt="추천"/><br/><br/><span>서울캠퍼스</span></div>
                        <div className='compete' onClick={moveToGlobal}><img src={require('../../media/structure/백년관.jpg')} alt="추천"/><br/><br/><span>글로벌캠퍼스</span></div>
                    </div>
                </ChooseBlock>
            </div>
            <div className='write'>여러분의 꿈을 응원합니다.</div>
            <div className='notice'>

                <br/><br/>
                <span>
                    학과별 예상 경쟁률은 "지원하기"를<br/> 선택한 이용자의 통계입니다.<br/>
                    한번 지원하면 <b>6시간</b> 후에 수정이<br/> 가능하니 참고부탁드립니다.
                </span>

     
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
 grid-template-rows: 3fr 2fr 5fr;
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

 

 /*글씨*/
 padding-top: 10%;

 font-size: 20px;
 color: #5a5a5a;
 font-weight: bold;

}

/*공지사항*/
div.notice{
 grid-row-start: 2;
 grid-row-start: 3;

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
 padding-bottom: 2%;
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
     width: 110px;
     height: 110px;
     border-radius: 10px;
     opacity: 0.8;
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
 padding-bottom: 2%;
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
     width: 110px;
     height: 110px;
     border-radius: 10px;
     opacity: 0.8;
 }
}
`