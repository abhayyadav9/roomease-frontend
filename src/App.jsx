import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import Contact, { Footer } from "./component/Contact.jsx";
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
import AdminRegister from "./component/admin/adminAuthPage/AdminRegister.jsx";
import AdminLogin from "./component/admin/adminAuthPage/AdminLogin.jsx";
import Dashboard from "./component/admin/Dashboard.jsx";
import AllRequirements from "./component/tenant/AllRequirements.jsx";
import RoleProtectedRoute from "./component/commonPage/RouteProtection.jsx";
import { useNotifications } from "./hooks/socket/useGetNotification.jsx";
import ChatWindow from "./component/message/ChatWindow.jsx";

import useGetRTM from "./hooks/socket/useGetRTM.jsx";
import SocketInitializer from "./utils/SocketInitializer.js";
import History from "./component/owner/History.jsx";
// // Role-based redirection component
const AuthRedirector = () => {
  const user = useSelector((state) => state.auth.user);
  //  const conversation  = useSelector((state) => state.chat.conversation);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "tenant") {
      navigate("/tenant/home");
    } else if (!user?.role === "tenant") {
      navigate("/login");
    }
  }, []); // Added dependencies

  return null;
};


function App() {
  const user = useSelector((state) => state.auth.user);
  useNotifications();
  useGetRTM();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // Initialize socket connection
      dispatch({ type: "socket/connect" });

      return () => {
        // Cleanup on unmount
        dispatch({ type: "socket/disconnect" });
      };
    }
  }, [user, dispatch]);

  return (
    <Router>
      <AppContent user={user} />
    </Router>
  );
}

const AppContent = ({ user }) => {
  const location = useLocation();
  const hideNavbarPaths = ["/admin/login" , "/admin/register","/admin/send-verification"];

  return (
    <div>
      <SocketInitializer />
      {/* Conditionally render Navbar */}
      {(!user || !["tenant", "admin"].includes(user?.role)) &&
        !hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <AuthRedirector />

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
        <Route path="/edit-room" element={<EditRoom />} />
        <Route path="/history" element={<History />} />

        <Route path="/view-room-detail/:roomId" element={<ViewRoomDetail />} />
        <Route path="/all-requirement" element={<AllRequirements />} />

        {/* Tenant Routes */}
        <Route element={<RoleProtectedRoute allowedRoles={["tenant"]} />}>
          <Route path="/tenant/*" element={<TenantHomeWrapper />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminHomeWrapper />} />

        {/* Message Routes */}
        <Route path="/owner-message" element={<ChatWindow />} />
      </Routes>

      <div className="h-full mt-20 mb-0 flex flex-col">
        <main className="flex-1">{/* Your page content */}</main>
      </div>
    </div>
  );
};

export default App;
