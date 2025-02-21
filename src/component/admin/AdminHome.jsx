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
      <Route path="/" element={<AdminHome />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="owners" element={<AllOwners />} />
        <Route path="owner" element={<SingleOwner />} />
        <Route path="tenants" element={<AllTTenants />} />
        <Route path="tenant/:userId" element={<SingleTenant />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="all-rooms" element={<AllRooms />} />
        <Route path="all-requirements" element={<AllRequirements />} />
      </Route>
    </Routes>
  );
};

export default AdminHomeWrapper;