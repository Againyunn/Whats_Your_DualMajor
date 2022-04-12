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
    //     //만약 1차 질문의 결과값(학문별 결과 반환)인 경우 questionId == 'result'로 넘겨주세요.

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



const RecommendService = {
    getFirstSectionQuestion,
    submitFirstSectionAnswer
    };
    export default RecommendService;