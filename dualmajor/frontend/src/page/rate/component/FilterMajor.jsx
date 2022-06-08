import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import RateService from '../../../services/rate.service';

export default function FilterMajor({campus}) { //어떤 캠퍼스인지 전달받고, 인자에 따라 서로 다른 값을 반환하도록 설정
    //변수 선언
    const [thisMajorList, setThisMajorList] = useState([{id: "1", name: "2"}]);
    const [selectedMajorId, setSelectedMajorId] = useState("");

    //API통신 선언
    //처음 화면 랜더링 시 → 각 캠퍼스별 전공리스트 받아오기
    useEffect(() => {

        //테스트용
        // console.log("rendering")
        let data = `
            [
                {
                    "id": "1",
                    "name": "GBT학부"
                },
                {
                    "id": "2",
                    "name": "컴퓨터공학부"
                },
                {
                    "id": "3",
                    "name": "세르비아크로아티아어과"
                },
                {
                    "id": "4",
                    "name": "브라질학과"
                }
            ]
        `
        setThisMajorList(Object.values(JSON.parse(data)));


        // //서울캠퍼스인 경우
        // if(campus === "seoul"){
        //     RateService.getMajorListGlobal().then(
        //         (response) => {
        //             setThisMajorList(Object.values(JSON.parse(response.data.majorListSeoul)));
        //             console.log(response.data.majorListSeoul);
        //         }
        //     )
        // }
        // //글로벌캠퍼스인 경우
        // else if(campus === "global"){
        //     RateService.getMajorListGlobal().then(
        //         (response) => {
        //             setThisMajorList(Object.values(JSON.parse(response.data.majorListSeoul)));
        //         }
        //     )
        // }
    },[])

    useEffect(() => {
        setSelectedMajorId(thisMajorList[0].name);
    },[thisMajorList])

    //select를 통해 전공을 선택하면 API를 요청
    useEffect(() => {

        if(selectedMajorId !== ""){
            //세션 스토리지에 선택된 전공 값 저장
            sessionStorage.setItem("selectedMajorId",  selectedMajorId);
        }

    },[selectedMajorId])
    

    //정보를 확인해볼 전공 확인 함수
    const SelectMajorId = (e) =>{
        setSelectedMajorId(e.target.value);
    }
    
    return (
        <>
            <Form.Select onChange={SelectMajorId}>
                {
                    !thisMajorList?  
                    <option value="0">학과 없음</option>:
                    thisMajorList.map(thisMajor => (
                        <option key={thisMajor.name} value={thisMajor.name}>
                        {thisMajor.name}
                        </option>
                    ))
                }
            </Form.Select>
        </>
    )
}
