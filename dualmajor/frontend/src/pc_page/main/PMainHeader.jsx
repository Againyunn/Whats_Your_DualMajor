import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// 스타일
import "./PMainHeader.css";

function PMainHeader(){

    // 서비스 메뉴 선택 시 상태관리용
    const [recommandService, setRecommandService] = useState(false);
    const [predictedRate, setPredictedRate] = useState(false);
    const [majorInfo, setMajorInfo] = useState(false);
    const [serviceIntro, setServiceIntro] = useState(false);

    let navigate = useNavigate();

    const handleSelectService = (type, state) => {
        let reverseState = null;

        //선택 상태 값 식별
        if(state === true){
            reverseState = false;
        }

        //어떤 유형의 서비스를 선택했는 지 식별
        if(type === "r"){
            setRecommandService(state);
            setPredictedRate(reverseState);
            setMajorInfo(reverseState);
            setServiceIntro(reverseState);
        }
        else if(type === "p"){
            setRecommandService(reverseState);
            setPredictedRate(state);
            setMajorInfo(reverseState);
            setServiceIntro(reverseState);
        }
        else if(type === "m"){
            setRecommandService(reverseState);
            setPredictedRate(reverseState);
            setMajorInfo(state);
            setServiceIntro(reverseState);
        }
        else if(type === "i"){
            setRecommandService(reverseState);
            setPredictedRate(reverseState);
            setMajorInfo(reverseState);
            setServiceIntro(state);
        }
    }


    return(
        <div className='main-header'>

            <div className='main-icon' onClick={()=>navigate('/')}>
                <img id='hufs-icon-white'src={require('../../media/main/외대마크(흰색).gif')} alt="외대 마크"/>
                <span id='main-name'>너의 이중전공은?</span>
            </div>
            <div className='main-select-service-wrap'>
                {
                    !recommandService?
                    <div className='main-select-service-tab'>
                        <span onClick={()=>handleSelectService('r', true)}>이중전공추천</span>
                    </div>:
                    <div className='selected-main-select-service'>
                        <span onClick={()=>handleSelectService('r', false)}>이중전공추천</span>
                    </div>
                }

                {
                    !predictedRate?
                    <div className='main-select-service-tab'>
                        <span onClick={()=>handleSelectService('p', true)}>예상경쟁률</span>
                    </div>:
                    <div className='selected-main-select-service'>
                        <span onClick={()=>handleSelectService('p', false)}>예상경쟁률</span>
                    </div>
                }

                {
                    !majorInfo?
                    <div className='main-select-service-tab'>
                        <span onClick={()=>handleSelectService('m', true)}>전공정보</span>
                    </div>:
                    <div className='selected-main-select-service'>
                        <span onClick={()=>handleSelectService('m', false)}>전공정보</span>
                    </div>
                }
 
                {
                    !serviceIntro?
                    <div className='main-select-service-tab'>
                        <span onClick={()=>handleSelectService('i', true)}>서비스 소개</span>
                    </div>:
                    <div className='selected-main-select-service'>
                        <span onClick={()=>handleSelectService('i', false)}>서비스 소개</span>
                    </div>
                }
            </div>
            <div className='login-wrap'>
                {/* 로그인 관련 처리 로직 추가 */}
            </div>
        </div>
    )
    
} export default PMainHeader;