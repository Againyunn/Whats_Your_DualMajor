// import React, { useState, useEffect } from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import AuthService from "./services/auth.service";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./components/Home";
// import Profile from "./components/Profile";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";
// const App = () => {
//   const [showModeratorBoard, setShowModeratorBoard] = useState(false);
//   const [showAdminBoard, setShowAdminBoard] = useState(false);
//   const [currentUser, setCurrentUser] = useState(undefined);
//   useEffect(() => {
//     const user = AuthService.getCurrentUser();
//     if (user) {
//       setCurrentUser(user);
//       setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
//       setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
//     }
//   }, []);
//   const logOut = () => {
//     AuthService.logout();
//   };
//   return (
//     <div>
//       <nav className="navbar navbar-expand navbar-dark bg-dark">
//         <Link to={"/"} className="navbar-brand">
//           bezKoder
//         </Link>
//         <div className="navbar-nav mr-auto">
//           <li className="nav-item">
//             <Link to={"/home"} className="nav-link">
//               Home
//             </Link>
//           </li>
//           {showModeratorBoard && (
//             <li className="nav-item">
//               <Link to={"/mod"} className="nav-link">
//                 Moderator Board
//               </Link>
//             </li>
//           )}
//           {showAdminBoard && (
//             <li className="nav-item">
//               <Link to={"/admin"} className="nav-link">
//                 Admin Board
//               </Link>
//             </li>
//           )}
//           {currentUser && (
//             <li className="nav-item">
//               <Link to={"/user"} className="nav-link">
//                 User
//               </Link>
//             </li>
//           )}
//         </div>
//         {currentUser ? (
//           <div className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <Link to={"/profile"} className="nav-link">
//                 {currentUser.username}
//               </Link>
//             </li>
//             <li className="nav-item">
//               <a href="/login" className="nav-link" onClick={logOut}>
//                 LogOut
//               </a>
//             </li>
//           </div>
//         ) : (
//           <div className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <Link to={"/login"} className="nav-link">
//                 Login
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/register"} className="nav-link">
//                 Sign Up
//               </Link>
//             </li>
//           </div>
//         )}
//       </nav>
//       <div className="container mt-3">
//         <Routes>
//           <Route path="/" element={<Home/>} />
//           <Route path="/home" element={<Home/>} />
//           <Route path="/login" element={<Login/>} />
//           <Route path="/register" element={<Register/>} />
//           <Route path="/profile" element={<Profile/>} />
//           <Route path="/user" element={<BoardUser/>} />
//           <Route path="/mod" element={<BoardModerator/>} />
//           <Route path="/admin" element={<BoardAdmin/>} />
//         </Routes>
//       </div>
//     </div>
//   );
// };
// export default App;











//라우터 설정
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './page/main/Main';
import Choose from './page/user/choose/Choose';
import Login from './page/user/login/Login';
import SignupForm from './page/user/signup/SignupForm';
import EditInfo from './page/user/editInfo/EditInfo';
import RecommendMain from './page/recommend/RecommendMain';
import Question1Frame from './page/recommend/question1/Question1Frame';
import Result1Frame from './page/recommend/result1/Result1Frame';
import Question2Frame from './page/recommend/question2/Question2Frame';
import RateMain from './page/rate/RateMain';
import SeoulMain from './page/rate/seoul/SeoulMain';
import GlobalMain from './page/rate/global/GlobalMain';
import Result2Frame from './page/recommend/result2/Result2Frame';
import SeoulMajorInfo from './page/majorInfoDetail/SeoulMajorInfo';
import GlobalMajorInfo from './page/majorInfoDetail/GlobalMajorInfo';
import ShowMyMajorInfo from './page/majorInfoDetail/ShowMyMajorInfo';
import SavedResultFrame from './page/recommend/savedResult/SavedResultFrame';
import ShowMyRateInfo from './page/rate/ShowMyRateInfo';

// pc버전 레이아웃 테스트
import PMainPage from './pc_page/main/PMainPage';
import PLogin from './pc_page/login/PLogin';
import PSignup from './pc_page/userInfo/PSignup';
import PEditUserInfo from './pc_page/userInfo/PEditUserInfo';
import PRecommendMain from './pc_page/recommend/PRecommendMain';
import PQuestion1 from './pc_page/recommend/PQuestion1';
import PQuestion2 from './pc_page/recommend/PQuestion2';
import PResult1 from './pc_page/recommend/PResult1';
import PResult2 from './pc_page/recommend/PResult2';
import PRateMain from './pc_page/rate/PRateMain';
import PRateSeoul from './pc_page/rate/PRateSeoul';
import PRateGlobal from './pc_page/rate/PRateGlobal';
import PShowMyRateInfo from './pc_page/rate/PShowMyRateInfo';
import PRecommendResult from './pc_page/recommend/PRecommendResult';
import PSeoulMajorInfo from './pc_page/majorInfoDetail/PSeoulMajorInfo';
import PGlobalMajorInfo from './pc_page/majorInfoDetail/PGlobalMajorInfo';
import PShowMyMajorInfo from './pc_page/majorInfoDetail/PShowMyMajorInfo';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* pc버전 레이아웃 테스트 */}
        <Route path='/' element={<PMainPage/>}/>
        <Route path='/login' element={<PLogin/>}/>
        <Route path='/signup' element={<PSignup/>}/>
        <Route path='/editInfo' element={<PEditUserInfo/>}/>
        <Route path='/recommend' element={<PRecommendMain/>}/>
        <Route path='/question1' element={<PQuestion1/>}/>
        <Route path='/question2' element={<PQuestion2/>}/>
        <Route path='/result1' element={<PResult1/>}/>
        <Route path='/result2' element={<PResult2/>}/>
        <Route path='/rate' element={<PRateMain/>}/>
        <Route path='/rate/seoul' element={<PRateSeoul/>}/>
        <Route path='/rate/global' element={<PRateGlobal/>}/>
        <Route path='/showMyRateInfo' element={<PShowMyRateInfo/>}/>
        <Route path='/recommendResult' element={<PRecommendResult/>}/>
        <Route path="/seoulMajorInfo" element={<PSeoulMajorInfo />} />
        <Route path="/globalMajorInfo" element={<PGlobalMajorInfo />} />
        <Route path='/showMyMajorInfo' element={<PShowMyMajorInfo/>}/>

        {/* 구버전 레이아웃 */}
        <Route path='/m' element ={<Main/>} />
        <Route path='/m/choose' element={<Choose/>} />
        <Route path='/m/login' element={<Login/>} />
        <Route path='/m/signup' element={<SignupForm/>} />
        <Route path='/m/editInfo' element={<EditInfo/>} />
        <Route path='/m/recommend' element={<RecommendMain/>}/>
        <Route path='/m/question1' element={<Question1Frame/>}/>
        <Route path='/m/result1' element={<Result1Frame/>}/>
        <Route path='/m/question2' element={<Question2Frame/>}/>
        <Route path='/m/result2' element={<Result2Frame/>}>
          <Route path=':id' element={<Result2Frame/>} />
        </Route>
        <Route path='/m/rate' element={<RateMain/>} />
        <Route path='/m/seoul' element={<SeoulMain/>} />
        <Route path='/m/global' element={<GlobalMain/>} />
        <Route path='/m/showMyRateInfo' element={<ShowMyRateInfo/>} />
        <Route path='/m/recommendResult' element={<SavedResultFrame/>} />
        <Route path="/m/seoulMajorInfo" element={<SeoulMajorInfo />} />
        <Route path="/m/globalMajorInfo" element={<GlobalMajorInfo />} />
        <Route path="/m/showMyMajorInfo" element={<ShowMyMajorInfo/>} />

        <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>죄송합니다. 잘못된 페이지 입니다.</p>
          </main>
        }
      />  
      </Routes>
    </BrowserRouter>
  </>
  );
}


export default App;
