import axios from "axios";
const API_URL = "https://81e0af5c-fa2e-4ea9-b93f-8d63072a71dc.mock.pstmn.io/";


/**캠퍼스별 전공 목록 받아오기*/
//서울캠퍼스 개설 전공 목록
const getMajorListSeoul = () => {
    return (axios.get(API_URL + "majorList/seoul/"));
}
//글로벌캠퍼스 개설 전공 목록
const getMajorListGlobal = () => {
    return (axios.get(API_URL + "majorList/global/"));
}

//전공 별 경쟁률 정보 
/**majorName(전공명)을 인자로 넘겨서 데이터 받기*/
const getRateInfo = (majorName) => {
    return (axios.post(API_URL + "majorList/global/"),{majorName});
}

const RateService = {
    getMajorListSeoul,
    getMajorListGlobal,
    getRateInfo
    };
    export default RateService;