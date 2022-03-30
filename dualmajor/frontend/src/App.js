//라우터 설정
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './page/main/Main';
import Choose from './page/user/choose/Choose';
import Login from './page/user/login/Login';
import SignupForm from './page/user/signup/SignupForm';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Main/>} />
        <Route path='/choose' element={<Choose/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignupForm/>} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
