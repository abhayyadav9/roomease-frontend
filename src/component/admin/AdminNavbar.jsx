import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/slice/themeSlice";
import { MdPersonOutline } from "react-icons/md";

const AdminNavbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector(state => state.auth?.user)
  const dispatch = useDispatch();

  // ✅ Apply theme globally to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 ${
          collapsed ? "w-16" : "w-64"
        }  transition-all duration-300`}
      >
        <div className="flex items-center justify-center h-16">
          <span className="text-xl font-semibold">
            {collapsed ? "AP" : "Admin Panel"}
          </span>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/admin/dashboard" className="flex items-center space-x-2">
                <DashboardOutlined />
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/admin/owners" className="flex items-center space-x-2">
                <UserOutlined />
                {!collapsed && <span>All Owners</span>}
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/admin/tenants" className="flex items-center space-x-2">
                <MdPersonOutline />
                {!collapsed && <span>All Tenants</span>}
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/admin/settings" className="flex items-center space-x-2">
                <SettingOutlined />
                {!collapsed && <span>Settings</span>}
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/admin/transaction" className="flex items-center space-x-2">
                <TransactionOutlined />
                {!collapsed && <span>Transaction</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${collapsed ? "ml-16" : "ml-64"} transition-all duration-300`}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 shadow-md flex items-center justify-between px-6 z-10">
          <button onClick={() => setCollapsed(!collapsed)} className="text-gray-800 dark:text-white">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-gray-800 dark:text-white">{user?.name}</span>
            <img
              src="https://via.placeholder.com/32"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <Switch
                onClick={() => dispatch(toggleTheme())}
                checkedChildren="Dark"
                unCheckedChildren="Light"
                checked={theme === "dark"}
              />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default AdminNavbar;
