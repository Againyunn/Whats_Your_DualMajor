import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import RateService from '../../../services/rate.service';

export default function FilterMajor({campus}) { //어떤 캠퍼스인지 전달받고, 인자에 따라 서로 다른 값을 반환하도록 설정
    //변수 선언
    const [thisMajorList, setThisMajorList] = useState("");
    const [selectedMajorId, setSelectedMajorId] = useState("");


    //API통신 선언
    //처음 화면 랜더링 시 → 각 캠퍼스별 전공리스트 받아오기
    useEffect(() => {
        //서울캠퍼스인 경우
        if(campus === "seoul"){
            RateService.getMajorListGlobal().then(
                (response) => {
                    setThisMajorList(response.data.majorListSeoul);
                }
            )
        }
        //글로벌캠퍼스인 경우
        else if(campus === "global"){
            RateService.getMajorListGlobal().then(
                (response) => {
                    setThisMajorList(response.data.majorListSeoul);
                }
            )
        }
        
    },[])

    //select를 통해 전공을 선택하면 API를 요청
    useEffect(() => {

        if(selectedMajorId !== ""){
            //세션 스토리지에 선택된 전공 값 저장
            sessionStorage.setItem("selectedMajorId",  selectedMajorId);
        }

    },[selectedMajorId])
    

    //받은 데이터 mapping
    const SetFilter = (thisMajorList) => {
        if(thisMajorList !== ""){

            return(
                <>
                    <Form.Select aria-label="Default select example">
                        {
                        thisMajorList.map( element => (
                            <option value={element.id} onClick={SelectMajorId(this.target.value)}>{element.name}</option>
                        ))}
                    </Form.Select>
                </>
            )
        }
    }

    //정보를 확인해볼 전공 확인 함수
    const SelectMajorId = (thisId) => {
        //선택된 전공의 id값으로 상태값 변경
        setSelectedMajorId(thisId);
    }
    
    return (
        <>
            <SetFilter thisMajorList={thisMajorList} />
        </>
    )
}
