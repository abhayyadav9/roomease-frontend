import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./component/authPage/Register.jsx";
import Login from "./component/authPage/Login.jsx"; // Example additional component
import Home from "./component/Home.jsx"; // Example additional component
import AccVerify from './component/authPage/AccVerify.jsx';
import SendVerification from './component/authPage/resetPassword/SendVerification.jsx';
import VerifyOtp from './component/authPage/resetPassword/VerifyOtp.jsx';
import UpdatePassword from './component/authPage/resetPassword/UpdatePassword.jsx';


function App() {
  return (
    <Router>
      <div className="flex items-center justify-center h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/acc-verify" element={<AccVerify />} />


          <Route path="/send-verification" element={<SendVerification />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/update-password" element={<UpdatePassword />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;