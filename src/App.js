import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./Components/Pages/Home";
import Compose from "./Components/Mailbox/Compose";

const App = () => {
  return (
  <> <Compose/>
      <Routes>
       
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        
      </Routes>
      </>
  );
};

export default App;
