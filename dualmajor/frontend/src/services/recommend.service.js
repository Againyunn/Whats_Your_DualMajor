import axios from "axios";
//const API_URL = "https://81e0af5c-fa2e-4ea9-b93f-8d63072a71dc.mock.pstmn.io/";
// const API_URL = "localhost:8080/"
const API_URL = "http://localhost:8080/"

//1번째 섹션 질문 정보 받아오기
const getFirstSectionQuestion = (questionNum, testKey) =>{

    return (axios.post(API_URL + "firstSectionQuestion/", {
        questionNum,//몇 번째 문제인지 식별하기 위함
        testKey//테스트하는 사용자 식별값
    })
    );

    //     //백엔드에서 받아올 데이터 리스트
    //     //questionNum, totalQuestionNum, questionId, questionContent, response1, response2 값을 받아야 함
    //     //만약 1차 질문의 결과값(학문별 결과 반환)인 경우 questionId == 'result숫자'로 넘겨주세요.
}
/**
 * {
        "testKey": (임시)회원식별 값, -> 처음에는 null 값
        "questionNum": "1",
        "questionContent": "성향vs진로?",
        "response1": "1",
        "response2": "2"
    }
 */

//1번째 섹션 답변 넘겨주기
const submitFirstSectionAnswer = (questionNum, testKey, answer) =>{
    return (axios.post(API_URL + "firstSectionAnswer/", {
        questionNum, //현재 사용자의 질문(몇 번째 질문인지 식별용)
        testKey,//테스트하는 사용자 식별값
        answer, //사용자가 답변한 값(response1 == 1, response2 == 2)
    })
    );
}
/**
 * 1번째 섹션 결과 창으로 이동할 때의 Signal: 질문이 아닌, 결과 값을 전달받았을 때의 데이터 형식
 * {
        "success": true,
        "finished": "result30",   ← 1차 섹션의 결과 id 값으로 받게 된다.
        "testKey": (임시)회원식별 값
    }
 */

//1번째 섹션 결과 받아오기
const getFirstSectionResult = (resultType, testKey) =>{
    return (axios.post(API_URL + "getFirstSectionResult/", {
        resultType,//앞선 1번째 섹션 질문 정보를 받아오는 API에서 반환된 문자열 값(어떤 result인지),
        testKey//테스트하는 사용자 식별값
    })
    );

    //백엔드에서 받아올 데이터 리스트
    //academicName, departmentList
    //만약 error 반환 시, 프론트엔드에서 error 페이지로 처리
}

/**
 * {
 *      "testKey": (임시)회원식별 값,
        "list": [
            {
                "academicName": "언어학섹터",
                "departmentList": [
                    "aagd",
                    "abcf"
                ]
            },
            {
                "academicName": "사회경제학섹터",
                "departmentList": [
                    "aqwa",
                    "aazpq"
                ]
            }
        ]
    }
 */


//1번째 섹션 결과에 대한 사용자의 선택값 넘겨주기
const submitFirstSectionResult = (academicName, testKey) => {
    return (axios.post(API_URL + "submitFirstSectionResult/", {
        academicName,//몇 번째 문제인지 식별하기 위함
        testKey//테스트하는 사용자 식별 값
    })
    );
}
/**
 * {
        "testKey": (임시)사용자식별 값,
        "success": true,
        "academicName": "언어학 섹터"  ← t섹터의 종류명을 받게 된다.
    }
 */



//2번째 섹션 질문 정보 받아오기
const getSecondSectionQuestion = (questionNum, testKey) =>{

    return (axios.post(API_URL + "secondSectionQuestion/", {
        questionNum,//몇 번째 문제인지 식별하기 위함
        testKey//테스트하는 사용자 식별 값
    })
    );

    //     //백엔드에서 받아올 데이터 리스트
    //     //questionNum, totalQuestionNum, questionId, questionContent, response1, response2 값을 받아야 함
    //     //만약 2차 질문의 결과값(추천학과 결과 반환)인 경우 questionId == 'result숫자'로 넘겨주세요.
}
/**
 * 2번째 섹터 질문 받아올 때 데이터 형식
 * {
 *  "testKey": (임시)회원식별 값,
    "questionNum": 2,
    "totalQuestionNum": "6",
    "questionContent": "교차캠퍼스가능?",
    "response1": "네",
    "response2": "아뇨"
}
 */

//2번째 섹션 답변 넘겨주기
const submitSecondSectionAnswer = (questionNum, answer, testKey) =>{
    return (axios.post(API_URL + "secondSectionAnswer/", {
        questionNum, //현재 사용자의 질문(몇 번째 질문인지 식별용)
        //questionId, //질문의 고유한 트리 id(현재 질문이 무엇인지 구분하고 다음 질문을 추출하기 위한 값)
        answer, //사용자가 답변한 값(response1 == 1, response2 == 2)
        testKey//테스트하는 사용자 식별 값
    })
    );
}

/**
 * 2번째 섹션 결과 창으로 이동할 때의 Signal: 질문이 아닌, 결과 값을 전달받았을 때의 데이터 형식
 * {
        "testKey": (임시)사용자식별 값,
        "success": true,
        "finished": "result101"   ← 최종 이중전공 추천결과 id 값으로 받게 된다.
    }
 */

//2번째 섹션 결과 받아오기
const getFinalResult = (resultType, testKey) =>{
    return (axios.post(API_URL + "finalResult/", {
        resultType,//앞선 2번째 섹션 질문 정보를 받아오는 API에서 반환된 문자열 값(어떤 result인지)
        testKey//테스트하는 사용자 식별 값
    })
    );

    //백엔드에서 받아올 데이터 예시
    /**
        "testKey": (임시)사용자식별 값
        "info": [
            {
                "departmentName": "경영",
                "campus": "서울",
                "intro": "inf1",
                "degree": "deg1",
                "career": "career1",//null가능
                "curriculum": "경영학원론",//null가능
                "certification": "전산회계",//null가능
                "webPage": "www.hufs.ac.kr" //null가능
            },
            {
                "departmentName": "국금",
                "campus": "글로벌",
                "intro": "inf2",
                "degree": "deg2",
                "career": "career2",
                "curriculum": "경제학원론",//null가능
                "certification": "경제학",//null가능
                "webPage": "www.hufs.ac.kr"
            }
        ]
    }
     */
    //departmentName, info 각각 JSON 내부에 객체 형식으로 
}

//사용자가 결정한 값을 localStorage에 저장하고 로그인한 회원의 결과 값은 DB에 저장
const saveResult =(departmentName, user, testKey) =>{ //user : 사용자가 로그인한 상태인지 식별하기 위한 값(로그인 시 session으로 user값 자동 생성)

    //resultType(학과 결과 값의 DB유형)을 로컬스토리지에 저장하여 비회원도, 회원가입 시 기존의 이중전공 추천 서비스 결과를 불러올 수 있도록 저장
    localStorage.setItem("recommendResult", departmentName);
    
    //로그인한 사용자는 DB에 이중전공 추천 서비스 결과 값을 저장할 수 있도록 조치
    return (axios.post(API_URL + "saveResult/", {
        departmentName,
        user, //로그인 안했으면 false전달
        testKey
    })
    );
}

const saveSurvey = (question1, question2, question3, question4, question5, question6, question7, starCount, user, testKey) => {
    return (axios.post(API_URL + "saveSurvey/", {
        question1, 
        question2, 
        question3, 
        question4, 
        question5, 
        question6, 
        question7, 
        starCount, 
        user, 
        testKey
    })
    );
}

//학과 결과 받아오기
const getDepartmentInfo = (departmentName, testKey) => {
    return (axios.post(API_URL + "getDepartmentInfo/", {
        departmentName,
        testKey
    })
    );  
}

//테스트 키 받아오기 
const getTestKey = () => {
    return (axios.post(API_URL + "testKey/"));
}

const RecommendService = {
    getFirstSectionQuestion,
    submitFirstSectionAnswer,
    getFirstSectionResult,
    submitFirstSectionResult,
    getSecondSectionQuestion,
    submitSecondSectionAnswer,
    getFinalResult,
    saveResult,
    saveSurvey,
    getDepartmentInfo,
    getTestKey
    };
    export default RecommendService;