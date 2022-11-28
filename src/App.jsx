import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import LoginView from "./Pages/Login/index";
import SignUpView from "./Pages/Signup";
import ErrorPage from "./Pages/Auth/ErrorPage/index";
import Landing from "./Pages/Auth/Landing/index";
import Main from "./Pages/Main/index";
import LS_Layout from './Pages/Auth/Layout/LS_Layout';
import Main_Layout from './Pages/Auth/Layout/Main_Layout';
import Admin_Layout from './Pages/Auth/Layout/Admin_Layout';
import {AnimatePresence} from "framer-motion";
import {createGlobalStyle} from "styled-components";
import {Fragment} from 'react';
import {CookiesProvider} from 'react-cookie';
import Admin from './Pages/Admin/index';
import Ad from './Pages/Admin/ad';
import Badge from './Pages/Admin/badge';
import Category from './Pages/Admin/category';
import Grass from './Pages/Admin/grass';
import CoinView from './Pages/Coin';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    user-select: none;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

function App() {
    return (
        <Fragment>
            <AnimatePresence>
                <CookiesProvider>
                    <GlobalStyle/>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<Main_Layout/>}>
                                <Route path='/' element={<Landing/>}></Route>
                                <Route path='/main' element={<Main/>}></Route>
                                <Route path='/coin' element={<CoinView/>}></Route>
                            </Route>
                            <Route element={<LS_Layout/>}>
                                <Route path='/login' element={<LoginView/>}></Route>
                                <Route path='/signup' element={<SignUpView/>}></Route>
                                <Route path='*' element={<ErrorPage/>}></Route>
                            </Route>
                            <Route element={<Admin_Layout/>}>
                                <Route path='/youDontKnow/AdminPage' element={<Admin/>}></Route>
                                <Route path='/youDontKnow/AdminPage/AdminBadge' element={<Badge/>}></Route>
                                <Route path='/youDontKnow/AdminPage/AdminGrass' element={<Grass/>}></Route>
                                <Route path='/youDontKnow/AdminPage/AdminAd' element={<Ad/>}></Route>
                                <Route path='/youDontKnow/AdminPage/AdminCategory' element={<Category/>}></Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </CookiesProvider>
            </AnimatePresence>
        </Fragment>
    );
}

export default App;