import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Register from "./component/authPage/Register.jsx";
import Login from "./component/authPage/Login.jsx";
import Home from "./component/Home.jsx";
import AccVerify from "./component/authPage/AccVerify.jsx";
import SendVerification from "./component/authPage/resetPassword/SendVerification.jsx";
import VerifyOtp from "./component/authPage/resetPassword/VerifyOtp.jsx";
import UpdatePassword from "./component/authPage/resetPassword/UpdatePassword.jsx";
import Navbar from "./component/Navbar.jsx";
import OwnerProfile from "./component/owner/OwnerProfile.jsx";
import AllRooms from "./component/AllRooms.jsx";
import AddRoom from "./component/owner/AddRoom.jsx";
import EditRoom from "./component/owner/EditRoom.jsx";
import ViewRoomDetail from "./component/commonPage/ViewRoomDetail.jsx";
import UpdateOwnerDetail from "./component/owner/UpdateOwnerDetail.jsx";
import TenantProfile from "./component/tenant/TenantProfile.jsx";
import TenantNavbar from "./component/tenant/TenantNavbar.jsx";
import UpdateTenantDetail from "./component/tenant/UpdateTenantDetail.jsx";
import AddRequirement from "./component/tenant/AddRequirement.jsx";
import AllRequirements from "./component/tenant/AllRequirements.jsx";
import UpdateRequirement from "./component/tenant/UpdateRequirement.jsx";
import AdminHome from "./component/admin/AdminHome.jsx";
import AdminHomeWrapper from "./component/admin/AdminHome.jsx";
import Contact from "./component/Contact.jsx";
import SingleRoom from "./component/SignleRoom.jsx";

// Component for role-based redirection
const AuthRedirector = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      // navigate("/admin/");
    }
  }, [user, navigate]);

  return null; // This component doesn't render anything
};

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <AuthRedirector /> {/* Ensure role-based navigation is handled */}
      <div className="min-h-screen flex flex-col">
        {user?.role === "owner" ? (
          <Navbar />
        ) : user?.role === "tenant" ? (
          <TenantNavbar />
        ) : null}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/acc-verify" element={<AccVerify />} />
          <Route path="/send-verification" element={<SendVerification />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          {/* Owner Routes */}
          <Route path="/owner-profile" element={<OwnerProfile />} />
          <Route path="/update-detail" element={<UpdateOwnerDetail />} />
          <Route path="/all-rooms" element={<AllRooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/edit-room" element={<EditRoom />} />
          <Route path="/view-room-detail" element={<ViewRoomDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/room/:roomId" element={<SingleRoom />} />



          {/* Tenant Routes */}
          <Route path="/tenant-profile" element={<TenantProfile />} />
          <Route
            path="/update/tenant/detail"
            element={<UpdateTenantDetail />}
          />
          <Route path="/add-requirement" element={<AddRequirement />} />
          <Route path="/all-requirement" element={<AllRequirements />} />
          <Route path="/update-requirement" element={<UpdateRequirement />} />

          {/* Admin Route */}
          {/* <Route path="/admin-home" element={<AdminHome />} /> */}
          <Route path="/admin/*" element={<AdminHomeWrapper />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
