import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Dashboard from "./Dashboard";
import Transaction from "./pages/Transaction";
import AllTTenants from "./AllTTenants";
import AllOwners from "./AllOwners";
import Settings from "./Settings";

const AdminHome = () => {
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
      <Route path="/" element={<AdminHome />}>
        {/* <Route index element={<Dashboard />} /> */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transaction" element={<Transaction />} />

        <Route path="owners" element={<AllOwners />} />
        <Route path="tenants" element={<AllTTenants />} />

        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminHomeWrapper;
