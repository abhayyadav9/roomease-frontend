import { Avatar, Button, Popover, Menu, Drawer, Modal } from "antd";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineSave } from "react-icons/ai";


import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  SearchOutlined,
  FormOutlined,
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  EditOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout as logoutAction } from "../../redux/slice/authSlice";
import BASEURL from "../../utils/BaseUrl";

const TenantNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const tenant = useSelector((state) => state.tenant.data?.data);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to logout?",
      onOk: async () => {
        try {
          setLogoutLoading(true);
          await axios.post(
            `${BASEURL}/api/v1/logout`,
            {},
            { withCredentials: true }
          );
          dispatch(logoutAction());
          navigate("/login");
        } catch (error) {
          console.error(error);
          Modal.error({
            title: "Logout Error",
            content: "Failed to logout. Please try again.",
          });
        } finally {
          setLogoutLoading(false);
        }
      },
    });
  };

  const menuItems = [
    {
      key: "home",
      label: (
        <NavLink to="/tenant/home" className="text-gray-700">
          Home
        </NavLink>
      ),
      icon: <HomeOutlined className="text-lg" />,
    },
    {
      key: "find-room",
      label: (
        <NavLink to="/tenant/all-rooms" className="text-gray-700">
          Find Room
        </NavLink>
      ),
      icon: <SearchOutlined className="text-lg" />,
    },
    {
      key: "requirements",
      label: (
        <NavLink to="/tenant/requirements" className="text-gray-700">
          Requirements
        </NavLink>
      ),
      icon: <FormOutlined className="text-lg" />,
    },
    {
      key: "contact",
      label: (
        <NavLink to="/tenant/contact" className="text-gray-700">
          Contact
        </NavLink>
      ),
      icon: <ContactsOutlined className="text-lg" />,
    },
  ];

  const profileContent = (
    <div className="flex flex-col gap-2 p-2 w-64">
      <div className="flex items-center gap-4 border-b pb-4">
        <Avatar
          src={tenant?.tenantPic}
          icon={<UserOutlined />}
          className="border-2 border-blue-500 hover:scale-105 transition-transform"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {user?.name || "Guest"}
          </h3>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      <NavLink
        to="/tenant/profile"
        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <UserOutlined className="text-lg text-blue-500" />
        <span className="text-gray-700">View Profile</span>
      </NavLink>

      <NavLink
        to="/tenant/update-detail"
        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <EditOutlined className="text-lg text-green-500" />
        <span className="text-gray-700">Edit Profile</span>
      </NavLink>
      <NavLink
        to="/tenant/saved-rooms"
        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <AiOutlineSave 
        className="text-lg text-green-500" />
        <span className="text-gray-700">Save Rooms</span>
      </NavLink>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
      >
        <LogoutOutlined className="text-lg" />
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/tenant/home"
            className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                RoomEase
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.key}
                to={
                  item.key === "home" ? "/tenant/home" : `/tenant/${item.key}`
                }
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}

            <Popover
              content={profileContent}
              trigger="click"
              placement="bottomRight"
              overlayClassName="profile-popover"
            >
              <Button
                type="text"
                className="flex items-center gap-2 h-10 hover:bg-gray-100 rounded-lg"
              >
                <Avatar
                  src={tenant?.tenantPic}
                  icon={<UserOutlined />}
                  className="border-2 border-blue-500"
                />
                <span className="text-gray-700">
                  {user?.name?.split(" ")[0]}
                </span>
              </Button>
            </Popover>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <CloseOutlined className="text-xl text-gray-700" />
            ) : (
              <MenuOutlined className="text-xl text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-6 w-6" />
            <span className="text-xl font-bold text-blue-600">RoomEase</span>
          </div>
        }
        placement="right"
        closable={false}
        onClose={toggleSidebar}
        open={isOpen}
        width="280px"
        className="mobile-drawer"
      >
        <Menu
          mode="inline"
          selectedKeys={[]}
          className="border-0"
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            className: "hover:bg-gray-100 rounded-lg my-1",
          }))}
        />

        <div className="mt-8 px-4 border-t pt-4">
          <NavLink
            to="/tenant/profile"
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <UserOutlined className="text-lg text-blue-500" />
            <span className="text-gray-700">Profile</span>
          </NavLink>
          <NavLink
            to="/tenant/saved-rooms"
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <AiOutlineSave
            className="text-lg text-blue-500" />
            <span className="text-gray-700">Saved Rooms</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
          >
            <LogoutOutlined className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </Drawer>
    </nav>
  );
};

export default TenantNavbar;
