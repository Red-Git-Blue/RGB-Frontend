import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from "./Pages/Login/index";
import SignUpView from "./Pages/Signup";
import ErrorPage from "./Pages/Auth/ErrorPage/index";
import Header from "./Pages/Auth/Header/index";
import Landing from "./Pages/Landing/index";
import Main from "./Pages/Main/index";
import LS_Layout from './Pages/Auth/Layout/LS_Layout';
import Main_Layout from './Pages/Auth/Layout/Main_Layout';
import { AnimatePresence } from "framer-motion";
import { createGlobalStyle } from "styled-components";
import { Fragment } from 'react';

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    user-select: none;
    font-family: "RobotoBlack",sans-serif;
  }
  @font-face{
    src: url('../public/nanum-gothic/NanumGothic.otf') format("opentype");
    font-family: "NanumRegular";
  }
  @font-face{
    src: url("../public/nanum-gothic/NanumGothicBold.otf");
    font-family: "NanumBold";
  }
  @font-face{
    src: url("../public/nanum-gothic/NanumGothicExtraBold.otf");
    font-family: "NanumExtra";
  }
  @font-face {
    src: url("../public/roboto/Roboto-Black.ttf");
    font-family: "RobotoBlack";
  }
  @font-face {
    src: url("../public/roboto/Roboto-Thin.ttf");
    font-family: "RobotoThin";
  }
  @font-face {
    src: url("../public/roboto/Roboto-Light.ttf");
    font-family: "RobotoLight";
  }
  @font-face {
    src: url("../public/roboto/Roboto-Regular.ttf");
    font-family: "RobotoRegular";
  }
  @font-face {
    src: url("../public/roboto/Roboto-Medium.ttf");
    font-family: "RobotoMedium";
  }
  @font-face {
    src: url("../public/roboto/Roboto-Bold.ttf");
    font-family: "RobotoBold";
  }
`;

function App() {
  return (
    <Fragment>
      <AnimatePresence>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route element={<Main_Layout />}>
              <Route path='/' element={<Landing />}></Route>
              <Route path='/main' element={<Main />}></Route>
            </Route>
            <Route element={<LS_Layout />}>
              <Route path='/login' element={<LoginView />}></Route>
              <Route path='/signup' element={<SignUpView />}></Route>
              <Route path='*' element={<ErrorPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </Fragment>
  );
}

export default App;