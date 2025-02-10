import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TransactionOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/slice/themeSlice";
import { MdPersonOutline } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import { logout as logoutAction } from "../../redux/slice/authSlice";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BASEURL from "../../utils/BaseUrl";

const AdminNavbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate= useNavigate()

  // Apply theme globally to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASEURL}/api/v1/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(logoutAction());
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging out");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 ${
          collapsed ? "w-20" : "w-64"
        } bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-100 shadow-lg z-20`}
      >
        {/* Toggle Button at Top of Sidebar */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          {/* {!collapsed && (
            <span className="text-xl font-semibold">Admin Panel</span>
          )} */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-4">
          <ul>
            <li className="px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-3"
              >
                <DashboardOutlined className="text-lg" />
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li className="px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Link to="/admin/owners" className="flex items-center space-x-3">
                <UserOutlined className="text-lg" />
                {!collapsed && <span>All Owners</span>}
              </Link>
            </li>
            <li className="px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Link to="/admin/tenants" className="flex items-center space-x-3">
                <MdPersonOutline className="text-lg" />
                {!collapsed && <span>All Tenants</span>}
              </Link>
            </li>
            <li className="px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Link
                to="/admin/settings"
                className="flex items-center space-x-3"
              >
                <SettingOutlined className="text-lg" />
                {!collapsed && <span>Settings</span>}
              </Link>
            </li>
            <li className="px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Link
                to="/admin/transaction"
                className="flex items-center space-x-3"
              >
                <TransactionOutlined className="text-lg" />
                {!collapsed && <span>Transaction</span>}
              </Link>
            </li>
            <li className="px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Link
                to="/admin/all-rooms"
                className="flex items-center space-x-3"
              >
                <HomeOutlined className="text-lg" />
                {!collapsed && <span>All Rooms</span>}
              </Link>
            </li>
            <li className="px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Link
                to="/admin/all-requirements"
                className="flex items-center space-x-3"
              >
                <HomeOutlined className="text-lg" />
                {!collapsed && <span>All Requirement</span>}
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-100 dark:bg-gray-700">
          <div className="flex items-center space-x-3"
          onClick={()=> navigate("/admin/profile")}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            {!collapsed && (
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
              </div>
            )}
          </div>
          <div
            onClick={handleLogout}
            className="flex items-center mt-3 space-x-3 text-gray-800 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-colors duration-200"
          >
            <CiLogout className="text-lg" />
            {!collapsed && <span>Logout</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 w-full ${
          collapsed ? "ml-20" : "ml-64"
        } transition-all duration-300`}
      >
        {/* Header */}
       <div className="w-full">
       <header className="fixed top-0  w-full right-0 h-16 bg-white dark:bg-gray-900 shadow-md flex items-center justify-end px-6 z-10">
          <div className="flex items-center space-x-6">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon className="text-gray-800 dark:text-white cursor-pointer" />
            </Badge>
            <Switch
              checked={theme === "dark"}
              onChange={() => dispatch(toggleTheme())}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              className="bg-gray-300 dark:bg-gray-700"
            />
            <div className="flex items-center space-x-3">
              <span className="text-gray-800 dark:text-white">{user?.name}</span>
              <img
                src="https://via.placeholder.com/32"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </header>
       </div>
      </div>
    </div>
  );
};

export default AdminNavbar;