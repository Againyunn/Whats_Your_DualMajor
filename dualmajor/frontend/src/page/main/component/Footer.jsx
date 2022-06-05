//메인 화면의 footer (기획, 개발자 명과 문의 시 이메일)
import React from 'react'
import styled from 'styled-components'
import '../../../media/css/footer.css';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Footer({showPrev, showNext, showDev}) {

  
  //showDev(제작자, 문의처 노출)
  //showPrev(이전 버튼 노출)
  //showNext(다음 버튼 노출)
  return (
      <div className='containerFooter'>
        {
          !showDev?
          <>
            {
              !showPrev?
              <>
                <div className='prev'><img src={require('../../../media/structure/무지.jpg')} alt="이전"/></div>
              </>:
              <>
                <div className='prev' onClick={() => { window.history.back(); }}><img src={require('../../../media/tab/이전.png')} alt="이전"/></div>
              </>
            }
            {
              !showNext?
              <>
                <div className='next'><img src={require('../../../media/structure/무지.jpg')} alt="이전"/></div>
              </>:
              <>
                <div className='next' onClick={() => { window.history.forward(); }}><img src={require('../../../media/tab/다음.png')} alt="다음"/></div>
              </>
            }
          </>:
          <>
              <div className='title'><span><b>◽기획/개발:</b></span><br/><span><b>◽문의:</b></span></div>
              <div className='content'><span>박동렬, 류승기, 정재윤, 최중원</span><br/><a href="mailto:rangyun36@gmail.com">rangyun36@gmail.com</a></div>
          </>

        }
      </div>
  )
}
