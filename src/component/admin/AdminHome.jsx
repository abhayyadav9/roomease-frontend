import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Dashboard from "./Dashboard";
import Transaction from "./pages/Transaction";
import AllOwners from "./pages/AllOwners";
import AllTTenants from "./pages/AllTTenants";
import Settings from "./pages/Settings";
import useGetAllOwner from "../../hooks/useGetAllOwner";
import useGetAllTenant from "../../hooks/useGetAllTenant";
import SingleTenant from "./pages/SingleTenant";
import SingleOwner from "./pages/SingleOwner";
import AdminProfile from "./pages/AdminProfile";
import AllRooms from "./pages/AllRooms";
import AllRequirements from "./pages/AllRequirements";
import useGetTenantDetails from "../../hooks/tenantHooks/usegetTenantDetails";
import useGetAllRooms from "../../hooks/useGetAllRooms";
import MessageLayout from "./messagePage/MessageLayout";
import AdminLogin from "./adminAuthPage/AdminLogin";
import AdminRegister from "./adminAuthPage/AdminRegister";
import AccVerify from "./adminAuthPage/AccVerify";
import SendVerification from "./adminAuthPage/resetPassword/SendVerification";
import UpdatePassword from "./adminAuthPage/resetPassword/UpdatePassword";
import VerifyOtp from "./adminAuthPage/resetPassword/VerifyOtp";




const AdminHome = () => {
  useGetAllOwner();
  useGetAllTenant();
  useGetTenantDetails();
  useGetAllRooms();

  return (
    <AdminNavbar>
      <Outlet />
    </AdminNavbar>
  );
};

const AdminHomeWrapper = () => {
  return (
    <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<AdminRegister />} />
          <Route path="/acc-verify" element={<AccVerify />} />
          <Route path="/send-verification" element={<SendVerification />} />
         <Route path="/verify-otp" element={<VerifyOtp />} />
         <Route path="/update-password" element={<UpdatePassword />} />



      <Route path="/" element={<AdminHome />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="owners" element={<AllOwners />} />
        <Route path="owner/:id" element={<SingleOwner />} />
        <Route path="tenants" element={<AllTTenants />} />
        <Route path="tenant/:userId" element={<SingleTenant />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="all-rooms" element={<AllRooms />} />

        <Route path="all-requirements" element={<AllRequirements />} />
      {/* //messages */}
      <Route path="messages" element={<MessageLayout />} />

      </Route>
    </Routes>
  );
};

export default AdminHomeWrapper;