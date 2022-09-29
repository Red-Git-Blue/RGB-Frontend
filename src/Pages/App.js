import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from "./Login";
import SignUpView from "./Signup";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginView />}></Route>
          <Route path='/signup' element={<SignUpView /> }></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
