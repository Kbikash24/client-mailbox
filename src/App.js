import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./Components/Pages/Home";
import Compose from "./Components/Mailbox/Compose";
import Inbox from "./Components/Mailbox/Inbox";
import Outbox from "./Components/Mailbox/Outbox";
import OpenOutbox from "./Components/Mailbox/OpenOutbox";
import OpenMails from "./Components/Mailbox/OpenMails";
import DeletedMails from "./Components/Mailbox/DeletedMails";
import NavBar from "./Components/Pages/Navbar";


const App = () => {
  return (
  <> <NavBar/>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/compose" element={<Compose/>}></Route>
        <Route path='/inbox' element={<Inbox/>}></Route>
        <Route path="/inbox/:id" element={<OpenMails/>}/>
        <Route path='/outbox' element={<Outbox/>}></Route>
        <Route path="/outbox/:id" element={<OpenOutbox/>}/>
        <Route path="/inbox/deletedMails/:id" element={<DeletedMails/>}/>
        
      </Routes>
      </>
  );
};

export default App;
