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
  useGetAllOwner()
  useGetAllTenant();
  useGetTenantDetails();
  useGetAllRooms()
  
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <AdminNavbar />

      {/* Content Area */}
      <div className="flex-grow overflow-auto  bg-gray-100 dark:bg-gray-800 h-screen">
        <div className="bg-white dark:bg-gray-700 mt-22 rounded-lg shadow-md min-h-full">
          {/* This Outlet will render nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// Add this wrapper component for routing
const AdminHomeWrapper = () => {
  return (
    <Routes>
      <Route path="/home" element={<AdminHome />}>
        {/* <Route index element={<Dashboard />} /> */}
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
