import axios from "axios";
const API_URL = "https://81e0af5c-fa2e-4ea9-b93f-8d63072a71dc.mock.pstmn.io/";

//1번째 섹션 질문 정보 받아오기
const getFirstSectionQuestion = (questionNum) =>{

    return (axios.post(API_URL + "firstSectionQuestion/", {
        questionNum//몇 번째 문제인지 식별하기 위함
    })
    );

    //     //백엔드에서 받아올 데이터 리스트
    //     //questionNum, totalQuestionNum, questionId, questionContent, response1, response2 값을 받아야 함
    //     //만약 1차 질문의 결과값(학문별 결과 반환)인 경우 questionId == 'result숫자'로 넘겨주세요.

}
//1번째 섹션 답변 넘겨주기
const submitFirstSectionAnswer = (questionNum, questionId, answer) =>{
    return (axios.post(API_URL + "firstSectionAnswer/", {
        questionNum, //현재 사용자의 질문(몇 번째 질문인지 식별용)
        questionId, //질문의 고유한 트리 id(현재 질문이 무엇인지 구분하고 다음 질문을 추출하기 위한 값)
        answer, //사용자가 답변한 값(response1 == 1, response2 == 2)
    })
    );
}

//1번째 섹션 결과 받아오기
const getFirstSectionResult = (resultType) =>{
    return (axios.post(API_URL + "getFirstSectionResult/", {
        resultType//앞선 1번째 섹션 질문 정보를 받아오는 API에서 반환된 문자열 값(어떤 result인지)
    })
    );

    //백엔드에서 받아올 데이터 리스트
    //academicName, departmentList
    //만약 error 반환 시, 프론트엔드에서 error 페이지로 처리
}


//1번째 섹션 결과에 대한 사용자의 선택값 넘겨주기
const submitFirstSectionResult = (academicName) => {
    return (axios.post(API_URL + "submitFirstSectionResult/", {
        academicName//몇 번째 문제인지 식별하기 위함
    })
    );
}

//2번째 섹션 질문 정보 받아오기
const getSecondSectionQuestion = (questionNum) =>{

    return (axios.post(API_URL + "secondSectionQuestion/", {
        questionNum//몇 번째 문제인지 식별하기 위함
    })
    );

    //     //백엔드에서 받아올 데이터 리스트
    //     //questionNum, totalQuestionNum, questionId, questionContent, response1, response2 값을 받아야 함
    //     //만약 2차 질문의 결과값(추천학과 결과 반환)인 경우 questionId == 'result숫자'로 넘겨주세요.
}

//2번째 섹션 답변 넘겨주기
const submitSecondSectionAnswer = (questionNum, questionId, answer) =>{
    return (axios.post(API_URL + "secondSectionAnswer/", {
        questionNum, //현재 사용자의 질문(몇 번째 질문인지 식별용)
        questionId, //질문의 고유한 트리 id(현재 질문이 무엇인지 구분하고 다음 질문을 추출하기 위한 값)
        answer, //사용자가 답변한 값(response1 == 1, response2 == 2)
    })
    );
}

//2번째 섹션 결과 받아오기
const getFinalResult = (resultType) =>{
    return (axios.post(API_URL + "getFinalResult/", {
        resultType//앞선 2번째 섹션 질문 정보를 받아오는 API에서 반환된 문자열 값(어떤 result인지)
    })
    );

    //백엔드에서 받아올 데이터 리스트
    //departmentName, info 각각 JSON 내부에 객체 형식으로 
}

//사용자가 결정한 값을 localStorage에 저장하고 로그인한 회원의 결과 값은 DB에 저장
const saveResult =(resultType, user) =>{ //user : 사용자가 로그인한 상태인지 식별하기 위한 값(로그인 시 session으로 user값 자동 생성)

    //resultType(학과 결과 값의 DB유형)을 로컬스토리지에 저장하여 비회원도, 회원가입 시 기존의 이중전공 추천 서비스 결과를 불러올 수 있도록 저장
    localStorage.setItem("recommendResult", resultType);
    
    //로그인한 사용자는 DB에 이중전공 추천 서비스 결과 값을 저장할 수 있도록 조치
    return (axios.post(API_URL + "saveResult/", {
        resultType,
        user 
    })
    );

}


const RecommendService = {
    getFirstSectionQuestion,
    submitFirstSectionAnswer,
    getFirstSectionResult,
    submitFirstSectionResult,
    getSecondSectionQuestion,
    submitSecondSectionAnswer,
    getFinalResult,
    saveResult
    };
    export default RecommendService;