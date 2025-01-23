import { Avatar, Button, Popover } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Drawer } from "antd";
import { useSelector } from "react-redux";
import { LiaUserEditSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";

const items = [
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      {
        key: "g1",
        label: "Item 1",
        type: "group",
        children: [
          {
            key: "1",
            label: "Option 1",
          },
          {
            key: "2",
            label: "Option 2",
          },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub4",
    label: "Navigation Three",
    icon: <SettingOutlined />,
    children: [
      {
        key: "9",
        label: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
      },
    ],
  },
  {
    key: "grp",
    label: "Group",
    type: "group",
    children: [
      {
        key: "13",
        label: "Option 13",
      },
    ],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const content = (
    <div className="flex flex-col gap-5  bg-gray-200">
      {/* Profile Section */}
      <Link to="/owner-profile">
        <div className="flex items-center gap-4">
          <Avatar 
          src={user?.userPic}
          
          size={35} icon={<UserOutlined />} />
          <span className="text-lg font-medium">
            <span>Hey, </span>
            {user
              ? user.name
                  .split(" ")[0] // Get first name
                  .charAt(0) // Get first letter
                  .toUpperCase() + user.name.split(" ")[0].slice(1) // Capitalize first letter
              : "User"}
          </span>
        </div>
      </Link>

      {/* Menu Options */}
      <div className="flex flex-col gap-2">
        {/* Edit Profile */}
        <Link
          to="/edit"
          className="flex items-center justify-between w-full px-2 py-1 hover:text-green-900 rounded"
        >
          <div className="flex items-center gap-3">
            <LiaUserEditSolid size={24} />
            <span className="text-md">Edit</span>
          </div>
        </Link>

        {/* Logout */}
        <Link
          to="/logout"
          className="flex items-center justify-between w-full px-2 py-1 hover:text-red-900 rounded"
        >
          <div className="flex items-center gap-3">
            <CiLogout size={24} />
            <span className="text-md">Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );
  return (
    <div>
      <nav className="bg-[#bfb8b8] shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                RoomEase
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link
                to="/"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
              {user ? (
                <Popover content={content} title="Profile">
                  <Button type=" " className=" hover">
                    Profile
                  </Button>
                </Popover>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={toggleSidebar}
        visible={isOpen}
        width="50%" // Set the width of the Drawer to 50% of the screen width
      >
        <Menu
          onClick={toggleSidebar}
          style={{ width: "100%" }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </Drawer>
    </div>
  );
};

export default Navbar;
