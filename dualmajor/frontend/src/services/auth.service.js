import axios from "axios";
const API_URL = "https://81e0af5c-fa2e-4ea9-b93f-8d63072a71dc.mock.pstmn.io/";

//회원가입
const register = (stdNum, password, nickName, grade, userType, firstMajorId, dualMajorId) => {
  return axios.post(API_URL + "join/", {
    stdNum, //문제가 있으면username으로 바꾸기
    password,
    nickName,
    grade,
    userType,
    firstMajorId,
    dualMajorId
  });
};

//POST(username, password) & JWT를 LocalStorage에 저장
const login = (stdNum, password) => {
  return axios
    .post(API_URL + "login/", {
      stdNum, //문제가 있으면username으로 바꾸기
        password,
    })
    .then((response) => {
        sessionStorage.setItem("user", JSON.stringify(response.data));

    //   if (response.data.accessToken) {
    //     localStorage.setItem("user", JSON.stringify(response.data));
    //   }
      return response.data;
    });
};

//로그아웃
const logout = () => {
  sessionStorage.removeItem("user");
};

//POST 유저정보 수정
const changeInfo = (stdNum, password, nickName, grade, userType, firstMajorId, dualMajorId) => {
  return axios.post(API_URL + "editInfo/", {
    stdNum, //문제가 있으면username으로 바꾸기
    password,
    nickName,
    grade,
    userType,
    firstMajorId,
    dualMajorId
  });
}

//GET 본전공 리스트
const firstMajorList = () =>{
  axios.get(API_URL + "firstMajorList/")
  .then((response) => {
    localStorage.setItem("firstMajor", JSON.stringify(response.data.firstMajor));
    // console.log(response.data.firstMajor);
    // return (response.data.firstMajor)
  })
  .catch((Error) => {
    return(Error)
  });
}

//GET 이중전공 리스트
const dualMajorList = () =>{
  axios.get(API_URL + "dualMajorList/")
  .then(response => {
    localStorage.setItem("dualMajor", JSON.stringify(response.data.dualMajor));
    // return (response.data.dualMajor)
  })
  .catch((Error) => {
    return(Error)
  });
}

//서비스 탈퇴 신청
const applyResign = (stdNum) =>{
  return axios.post(API_URL + "resign/", {
    stdNum, //문제가 있으면username으로 바꾸기
  });
} 

//쿠키 값 불러오기(로그인 자동저장)
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  changeInfo,
  firstMajorList,
  dualMajorList,
  applyResign,
  getCurrentUser,
};
export default AuthService;