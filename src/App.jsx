import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MemberLoginView from "./Pages/Login/ML";
import LoginView from "./Pages/Login/index";
import SignUpView from "./Pages/Signup";
import ErrorPage from "./Pages/Auth/ErrorPage/index";
import Header from "./Pages/Auth/Header/index";
import Main from "./Pages/Main/index";
import LS_Layout from './Pages/Auth/Layout/LS_Layout';
import Main_Layout from './Pages/Auth/Layout/Main_Layout';
import { AnimatePresence } from "framer-motion";


function App() {
  return (
    <div>
      <AnimatePresence>
        <BrowserRouter>
          <Routes>
            <Route element={<Main_Layout />}>
              <Route path='/' element={<Main />}></Route>
            </Route>
            <Route element={<LS_Layout />}>
              <Route path='/login' element={<LoginView />}>
                <Route path=':member' element={<MemberLoginView />}></Route>
              </Route>
              <Route path='/signup' element={<SignUpView />}></Route>
              <Route path='*' element={<ErrorPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </div>
  );
}

export default App;