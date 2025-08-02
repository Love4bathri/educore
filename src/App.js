import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navb from './navbar';
import './App.css';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Home from './home';
import Userlist from './USer api/userlist';
import Useradd from './USer api/useradd';
// import Login from './login';
import Regis from './registration';
import Studentadd from './Student/studentadd';
import Studentlist from './Student/studentlist';
import MarkAdd from './marksheet/markAdd';
import Marklist from './marksheet/marklist';
 
function App() {
  return (
    <>
      <BrowserRouter>
      <Navb />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Userlist" element={<Userlist/>}/>
        <Route path="/Useradd" element={<Useradd/>}/>
        <Route path="/Useradd/:pid" element={<Useradd/>}/>
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path="/Regis" element={<Regis/>}/>
        <Route path="/studentadd" element={<Studentadd/>}/>
        <Route path="/studentadd/:pid" element={<Studentadd/>}/>
        <Route path="/studentlist" element={<Studentlist/>}/>
        <Route path="/marksheetlist" element={<Marklist/>}/>
        <Route path="/marksheetadd" element={<MarkAdd/>}/>
        <Route path="/marksheetadd/:pid" element={<MarkAdd/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
