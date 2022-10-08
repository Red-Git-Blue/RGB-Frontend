import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from "./Pages/Join/Login";
import SignUpView from "./Pages/Join/Signup";
import ErrorPage from "./Pages/ErrorPage";
import Main from "./Pages/Main";

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
