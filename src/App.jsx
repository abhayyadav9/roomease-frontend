import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./component/authPage/Register.jsx";
import Login from "./component/authPage/Login.jsx"; // Example additional component
import Home from "./component/Home.jsx"; // Example additional component
import AccVerify from "./component/authPage/AccVerify.jsx";
import SendVerification from "./component/authPage/resetPassword/SendVerification.jsx";
import VerifyOtp from "./component/authPage/resetPassword/VerifyOtp.jsx";
import UpdatePassword from "./component/authPage/resetPassword/UpdatePassword.jsx";
import Navbar from "./component/Navbar.jsx";
import OwnerProfile from "./component/owner/OwnerProfile.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/acc-verify" element={<AccVerify />} />

          <Route path="/send-verification" element={<SendVerification />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          {
            // owner routes
          }

          <Route path="/owner-profile" element={<OwnerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
