import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import Home from "./Components/Home";
import Nav from "./Components/Nav";

const App = () => {
  return (
    <>
    {/* <Nav/> */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      </Routes>
    </>
  );
};

export default App;
