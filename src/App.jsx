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
import AllRooms from "./component/AllRooms.jsx";


// Tenant Components

// Admin Components
import AdminHomeWrapper from "./component/admin/AdminHome.jsx";

import AllRequirements from "./component/tenant/AllRequirements.jsx";
import RoleProtectedRoute from "./component/commonPage/RouteProtection.jsx";
import ChatWindow from "./component/message/ChatWindow.jsx";

import SocketInitializer from "./utils/SocketInitializer.js";
import useGetTenantDetails from "./hooks/tenantHooks/usegetTenantDetails.jsx";
import useGetAllRequirement from "./hooks/useGetAllRequirement.jsx";
import useGetAllRooms from "./hooks/useGetAllRooms.jsx";
import TenantLayout from "./component/tenant/TenantLayout.jsx";
import NotFound from "./component/commonPage/NotFound.jsx";
import axios from "axios";
import OwnerLayout from "./component/owner/OwnerLayout.jsx";

function App() {
  const user = useSelector((state) => state.auth.user);
  useGetAllRooms();
  useGetTenantDetails();
  useGetAllRequirement();

  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;

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

    <>
      <Router>
        <AppContent user={user} />
      </Router>
    </>
  );
}

const AppContent = ({ user }) => {
  const location = useLocation();
  const hideNavbarPaths = [
    "login",
    "/admin/login",
    "/admin/register",
    "/admin/send-verification",
  ];

  return (
    <div>
      <SocketInitializer />
      {hideNavbarPaths && user? "":<Navbar/>}


      <Routes>
        <Route path="*" element={<NotFound />} />

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

        <Route path="/owner/*" element={<OwnerLayout />} />

        {/* <Route path="/owner-profile" element={<OwnerProfile />} />
        <Route path="/update-detail" element={<UpdateOwnerDetail />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/edit-room" element={<EditRoom />} />
        <Route path="/history" element={<History />} /> */}
        <Route path="/all-rooms" element={<AllRooms />} />

        <Route path="/view-room-detail/:roomId" element={<ViewRoomDetail />} />
        <Route path="/all-requirement" element={<AllRequirements />} />

        {/* Tenant Routes */}
        <Route element={<RoleProtectedRoute allowedRoles={["tenant"]} />}>
          <Route path="/tenant/*" element={<TenantLayout />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminHomeWrapper />} />

        {/* Message Routes */}
        <Route path="/owner-message" element={<ChatWindow />} />
      </Routes>
    </div>
  );
};

export default App;
