import axios from "axios";
//const API_URL = "https://81e0af5c-fa2e-4ea9-b93f-8d63072a71dc.mock.pstmn.io/";
// const API_URL = "localhost:8080/"
const API_URL = "http://localhost:8080/"


/**캠퍼스별 전공 목록 받아오기*/
//서울캠퍼스 개설 전공 목록
const getMajorListSeoul = () => {
    return (axios.post(API_URL + "majorList/seoul/"));
}
//글로벌캠퍼스 개설 전공 목록
const getMajorListGlobal = () => {
    return (axios.post(API_URL + "majorList/global/"));
}

//전공 별 경쟁률 정보 
/**majorName(전공명)을 인자로 넘겨서 데이터 받기*/
const getRateInfo = (name) => {
    return (axios.post(API_URL + "rateInfo/",{name}));
}

//지원정보 받아오기
/**
 * 프론트엔드에서 로그인한 경우에만 정보를 요청하도록 설정할 것이므로, 백엔드는 로그인 유무 신경 안써도 됩니다.
 * 경우1: 지원x 인 경우 → stdNum: 학번, apply: false, majorName: null, gpa: null, change: true
 * 
 * 경우2: 지원한 경우 → stdNum: 학번, apply: true, majorName: DB내의 학과명, gpa: 학점, change: true/false
 */
/**
 * 백엔드에 로직 요구사항:
 * 1. 지원정보가 없는 경우 경우1의 값을 default value로 설정
 * 2. 지원한 학과 정보를 DB에 저장되어 있는 majorName(학과 명) 형태로 반환 -> id형태로는 프론트단에서 식별 불가
 * 3. 지원학과 변경 가능 여부는 change인자에 boolean 값으로 반환
 *      조건: 프론트에서 사용자가 특정 학과에 지원했다는 정보를 받으면 백엔드 단에서 자동으로 해당 일자를 DB에 기록
 *            이후 프론트에서 사용자의 지원 정보를 요청할 때, DB에 기록된 저장일자와 현재 시각을 계산하여 지원정보 수정가능한 조건(6시간이나 12시간)충족 시 
 *            change: true로 반환하고, 조건이 충족되지 않았으면 false로 반환
 */
/**
 * gpa 처리: 학교 DB와 연계되지 않았으므로, 우선은 회원가입 시 or 경쟁률 서비스의 학과 지원 시 입력받는 형태로 
 * 
 * 차후 보완해야 할 점: 사진이나 캡쳐를 통해 업로드하고, 백엔드 단에서 AI의 사진 내 텍스트 인식 기술 기반으로 해당 학점과 학과 정보를 인식하는 방식으로 변경필요
 */
//기존 지원 정보 받아오기
const getApplyInfo = (stdNum) => {
    return(axios.post(API_URL + "getApplyInfo/", {stdNum}));
} //백엔드 value 반환 형식:  stdNum: 학번, apply: boolean, majorName: DB내의 학과명, gpa: 학점정보, change: boolean


//지원하기
const postApply = (stdNum, name, apply) => {
    return(axios.post(API_URL + "postApply/", {stdNum, name, apply}));
} //백엔드 value 반환 형식:  success(성공했다는 정보) or 에러 반환


const RateService = {
    getMajorListSeoul,
    getMajorListGlobal,
    getRateInfo,
    getApplyInfo,
    postApply
    };
    export default RateService;