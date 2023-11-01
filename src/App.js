import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from './Components/Auth/SignUp'
import Login from "./Components/Auth/Login";
import Home from './Components/Pages/Home'
import ForgetPassword from "./Components/Auth/ForgotPassword";
import Inbox from "./Components/Mailbox/Inbox";
import OpenMails from "./Components/Mailbox/OpenMails";
import DeletedMails from "./Components/Mailbox/DeletedMails";
import Outbox from "./Components/Mailbox/Outbox";
import OpenOutbox from "./Components/Mailbox/OpenOutbox";
import NavBar from "./Components/Pages/Navbar";
import About from "./Components/Pages/About";

function App() {
  const isLoggedIn= useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
    <NavBar/>
    <Routes>
    {!isLoggedIn && <Route path="/signup" element={<SignUp/>}/>}
   {!isLoggedIn && <Route path="/login" element={<Login/>}/>}   
   <Route path="/about" element={<About/>}/>
   {isLoggedIn && <Route path="/home" element={<Home/>}/> }
   {isLoggedIn && <Route path="/inbox" element={<Inbox/>}/>}
   {isLoggedIn && <Route path="/inbox/:id" element={<OpenMails/>}/>}
      {isLoggedIn && <Route path="/outbox" element={<Outbox/>}/>}
      {isLoggedIn && <Route path="/outbox/:id" element={<OpenOutbox/>}/>}
   {isLoggedIn && <Route path="/inbox/deletedMails/:id" element={<DeletedMails/>}/>}
   {!isLoggedIn && <Route path="/forgotpassword" element={<ForgetPassword/>}/>}
   {!isLoggedIn && <Route path='*' element={<Navigate to='/login'/>}/>}
   {isLoggedIn && <Route path='*' element={<Navigate to='/home'/>}/>}
    </Routes>
    </>
  )     
}

export default App;