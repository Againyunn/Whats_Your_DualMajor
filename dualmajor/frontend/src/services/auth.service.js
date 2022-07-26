import axios from "axios";
//const API_URL = "https://81e0af5c-fa2e-4ea9-b93f-8d63072a71dc.mock.pstmn.io/";
// const API_URL = "localhost:8080/"
const API_URL = "http://127.0.0.1:8080/"

//POST 회원가입
const register = (stdNum, password, nickName, grade, userType, firstMajorId, dualMajorId, gpa) => {
  return axios.post(API_URL + "join/", {
    stdNum, //문제가 있으면username으로 바꾸기
    password,
    nickName,
    grade,
    userType,
    firstMajorId,
    dualMajorId,
    gpa
  });
};

//POST(username, password) & JWT를 LocalStorage에 저장
const login = (email, password) => {
  return axios
    .post(API_URL + "login/", {
      email, //문제가 있으면username으로 바꾸기
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
const changeInfo = (email, password, nickName, grade, userType, firstMajorId, dualMajorId, gpa) => {
  return axios.post(API_URL + "editInfo/", {
    email, //문제가 있으면username으로 바꾸기
    password,
    nickName,
    grade,
    userType,
    firstMajorId,
    dualMajorId,
    gpa
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

//POST 서비스 탈퇴 신청
const applyResign = (email) =>{
  return axios.post(API_URL + "resign/", {
    email, //문제가 있으면username으로 바꾸기
  });
} 

//POST 아이디 중복확인
const checkDuplicate = (stdNum) => {
  return axios.post(API_URL + "checkEmail/", {
    stdNum, 
  })
}

//쿠키 값 불러오기(로그인 자동저장)
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

//비밀번호 재설정 용 API
//유효 Id체크
const checkJoinedEmail = (stdNum) => {
  return axios.post(API_URL + "checkJoinedEmail/", {
    stdNum
  })
}

//비밀번호 재설정
const editPW = (stdNum, password) => {
  return axios.post(API_URL + "/editPW", {
    stdNum, password
  })
}

const AuthService = {
  register,
  login,
  logout,
  changeInfo,
  firstMajorList,
  dualMajorList,
  applyResign,
  checkDuplicate,
  getCurrentUser,
  checkJoinedEmail,
  editPW
};
export default AuthService;