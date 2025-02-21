import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Auth Components
import Register from "./component/authPage/Register.jsx";
import Login from "./component/authPage/Login.jsx";
import AccVerify from "./component/authPage/AccVerify.jsx";
import SendVerification from "./component/authPage/resetPassword/SendVerification.jsx";
import VerifyOtp from "./component/authPage/resetPassword/VerifyOtp.jsx";
import UpdatePassword from "./component/authPage/resetPassword/UpdatePassword.jsx";

// Common Components
import Home from "./component/Home.jsx";
import Navbar from "./component/Navbar.jsx";
import Contact from "./component/Contact.jsx";
import ViewRoomDetail from "./component/commonPage/ViewRoomDetail.jsx";
import SingleRoom from "./component/SignleRoom.jsx";

// Owner Components
import OwnerProfile from "./component/owner/OwnerProfile.jsx";
import AllRooms from "./component/AllRooms.jsx";
import AddRoom from "./component/owner/AddRoom.jsx";
import EditRoom from "./component/owner/EditRoom.jsx";
import UpdateOwnerDetail from "./component/owner/UpdateOwnerDetail.jsx";

// Tenant Components
import TenantHomeWrapper from "./component/tenant/HomeTenant.jsx";

// Admin Components
import AdminHomeWrapper from "./component/admin/AdminHome.jsx";

// Role-based redirection component
const AuthRedirector = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch(user?.role) {
        case "admin":
          navigate("/admin/");
          break;
        case "tenant":
          navigate("/tenant/home");
          break;
        // case "owner":
        //   navigate("/owner-profile");
        //   break;
        // default:
        //   navigate("/");
      }
    }
  }, []); // Added dependencies

  return null;
};

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <AuthRedirector />
      {(!user || !["tenant", "admin"].includes(user?.role)) && <Navbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/acc-verify" element={<AccVerify />} />
        <Route path="/send-verification" element={<SendVerification />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/room/:roomId" element={<SingleRoom />} />

        {/* Owner Routes */}
        <Route path="/owner-profile" element={<OwnerProfile />} />
        <Route path="/update-detail" element={<UpdateOwnerDetail />} />
        <Route path="/all-rooms" element={<AllRooms />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/edit-room/:roomId" element={<EditRoom />} />
        <Route path="/view-room-detail/:roomId" element={<ViewRoomDetail />} />

        {/* Tenant Routes */}
        <Route path="/tenant/*" element={<TenantHomeWrapper />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminHomeWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;