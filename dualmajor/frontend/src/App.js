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

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Main/>} />
        <Route path='/choose' element={<Choose/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignupForm/>} />
        <Route path='/editInfo' element={<EditInfo/>} />
        <Route path='/recommend' element={<RecommendMain/>}/>
        <Route path='/question1' element={<Question1Frame/>}/>
        <Route path='/result1' element={<Result1Frame/>}/>
        <Route path='/question2' element={<Question2Frame/>}/>
        <Route path='/result2' element={<Result2Frame/>}>
          <Route path=':id' element={<Result2Frame/>} />
        </Route>
        <Route path='/rate' element={<RateMain/>} />
        <Route path='/seoul' element={<SeoulMain/>} />
        <Route path='/global' element={<GlobalMain/>} />
        <Route path='/showMyRateInfo' element={<ShowMyRateInfo/>} />
        <Route path='/recommendResult' element={<SavedResultFrame/>} />
        <Route path="/seoulMajorInfo" element={<SeoulMajorInfo />} />
        <Route path="/globalMajorInfo" element={<GlobalMajorInfo />} />
        <Route path="/showMyMajorInfo" element={<ShowMyMajorInfo/>} />

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
