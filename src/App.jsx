import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import LoginView from "./Pages/User/Login/index";
import SignUpView from "./Pages/User/Signup";
import CoinView from './Pages/User/Coin';
import SearchView from './Pages/User/Search';
import Main from "./Pages/User/Main/index";
import ShopView from './Pages/User/Shop';
import MyPageView from './Pages/User/MyPage';
import ErrorPage from "./Pages/Auth/ErrorPage/index";
import Header from "./Pages/Auth/Header/index";
import Landing from "./Pages/Auth/Landing/index";
import LS_Layout from './Pages/Auth/Layout/LS_Layout';
import Main_Layout from './Pages/Auth/Layout/Main_Layout';
import Admin_Layout from './Pages/Auth/Layout/Admin_Layout';
import {AnimatePresence} from "framer-motion";
import {createGlobalStyle} from "styled-components";
import {Fragment} from 'react';
import {CookiesProvider} from 'react-cookie';
import Admin from './Pages/Admin/index';
import Ad from './Pages/Admin/ad';
import Index from './Pages/Admin/Badge/index';
import Category from './Pages/Admin/category';
import Grass from './Pages/Admin/grass';
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    user-select: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true}/>
                <AnimatePresence>
                    <CookiesProvider>
                        <GlobalStyle/>
                        <BrowserRouter>
                            <Routes>
                                <Route element={<Main_Layout/>}>
                                    <Route path='/' element={<Landing/>}></Route>
                                    <Route path='/main' element={<Main/>}></Route>
                                    <Route path='/coin' element={<CoinView/>}></Route>
                                    <Route path='/search' element={<SearchView />}></Route>
                                    <Route path='/shop' element={<ShopView />}></Route>
                                    <Route path='/mypage' element={<MyPageView/>}></Route>
                                </Route>
                                <Route element={<LS_Layout/>}>
                                    <Route path='/login' element={<LoginView/>}></Route>
                                    <Route path='/signup' element={<SignUpView/>}></Route>
                                    <Route path='*' element={<ErrorPage/>}></Route>
                                </Route>
                                <Route element={<Admin_Layout/>}>
                                    <Route path='/youDontKnow/AdminPage' element={<Admin/>}></Route>
                                    <Route path='/youDontKnow/AdminPage/AdminBadge' element={<Index/>}></Route>
                                    <Route path='/youDontKnow/AdminPage/AdminGrass' element={<Grass/>}></Route>
                                    <Route path='/youDontKnow/AdminPage/AdminAd' element={<Ad/>}></Route>
                                    <Route path='/youDontKnow/AdminPage/AdminCategory' element={<Category/>}></Route>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </CookiesProvider>
                </AnimatePresence>
        </QueryClientProvider>
    );
}

export default App;