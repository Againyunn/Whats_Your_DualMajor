
//라우터 설정
import { HashRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './page/main/Main';
import Choose from './page/user/choose/Choose';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Main/>} />
        <Route path='/choose' element={<Choose/>} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
