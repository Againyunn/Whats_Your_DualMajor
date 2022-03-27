
//라우터 설정
import { HashRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './page/main/Main';
import Choose from './page/user/choose/Choose';
import Login from './page/user/login/Login';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Main/>} />
        <Route path='/choose' element={<Choose/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
