import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button} from 'react-bootstrap';

export default function Error() {

  //화면 이동 제어용 callback함수 정의
  let navigate = useNavigate();

  
  const goToStart = () => {
    //이중전공 추천 첫 page로 이동
    navigate("/recommend");
    window.location.reload();
    
}

  return (
    <BodyBlock>
      <div className='container'>
        <span className='notice'>
          죄송합니다.<br/>
          답변을 통해 정확한 결과를 추출하지 못했어요.😭<br/>
          다시 한번 테스트 해주시겠어요?
        </span>
        <div className='nextButtonFrame'>
          <Button className='nextButton' onClick={() => goToStart()}>다시 테스트 하기</Button>
        </div>
      </div>
    </BodyBlock>
  )
}


//CSS
const BodyBlock = styled.div`
    .container{
        display: flex;
        background-color: white;
        text-align: center;
        flex-direction: column;
        justify-content: space-between;
        height: 60vh;
        
        
        /*vertical-align: middle;*/
    }

    /*안내문구*/
    .notice{
        flex-grow: 0;
        align-items: center;
        
        /*글씨*/
        padding-top: 3%;
        font-size: 15px;
        color: #5a5a5a;

    }

   
    /* 버튼*/
    .nextButtonFrame{
      flex-grow: 0;

      //가운데 정렬용 선언
      // display: flex;
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