import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from "./Join/Login";
import SignUpView from "./Join/Signup";
import ErrorPage from "./ErrorPage";
import Main from "./Main";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<LoginView />}></Route>
          <Route path='/signup' element={<SignUpView /> }></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
