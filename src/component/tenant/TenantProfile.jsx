import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AllRequirements from "./AllRequirements";
import TenantCreateRequirement from "./TenantCreateRequirement";
import axios from "axios";
import BASEURL from "../../utils/BaseUrl";
import { logout as logoutAction } from "../../redux/slice/authSlice";
import { CiLogout } from "react-icons/ci";
import SavedRooms from "./SavedRooms";

const TenantProfile = () => {
  const tenant = useSelector((state) => state.tenant?.data?.data);
  const requirements = useSelector(
    (state) => state.requirement.requirements.requirement.requirements
  );
  const [toggle, setToggle] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Filter requirements created by this tenant
  const tenantRequirements = requirements.filter(
    (req) => req?.tenant?.user === user?.id
  );

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
    <div className="container mx-auto mt-16 p-4">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-6">
          {/* Tenant Avatar */}
          <img
            src={tenant?.tenantPic || "https://via.placeholder.com/100"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-600 object-cover"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              {tenant?.name || "Unknown Tenant"}
            </h2>
            <p className="text-sm text-gray-500">
              {tenant?.user?.email || "No email provided"}
            </p>
          </div>
        </div>

        <Divider />

        {/* Tenant Info */}
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="w-1/3 text-lg text-gray-700 font-medium">
              Phone:
            </span>
            <span className="w-2/3 text-lg text-gray-900">
              {tenant?.phone || "N/A"}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-1/3 text-lg text-gray-700 font-medium">
              Address:
            </span>
            <span className="w-2/3 text-lg text-gray-900">
              {tenant?.address || "N/A"}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-6">
          <Button
            type="dashed"
            icon={<EditOutlined />}
            size="large"
            className="w-full sm:w-auto"
            onClick={() => navigate("/tenant/update-detail")}
          >
            Edit Profile
          </Button>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            size="large"
            className="w-full sm:w-auto"
            onClick={() => navigate("/tenant/add-requirement")}
          >
            Add New Requirement
          </Button>

          {/* Logout */}
          <div
            onClick={handleLogout}
            className="flex items-center justify-between w-full px-2 py-1 hover:text-red-900 rounded"
          >
            <div className="flex items-center gap-3">
              <CiLogout size={24} />
              <span className="text-md">Logout</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
  <Button className="mt-6 bg-red-700" onClick={() => setToggle("requirement")}>
    Total Requirement
  </Button>
  <Button className="mt-6 bg-blue-500" onClick={() => setToggle("saved")}>
    Saved
  </Button>
  <Button className="mt-6 bg-green-700" onClick={() => setToggle("query")}>
    Apply for Query A
  </Button>
</div>

<div className="mt-6">
  {toggle === "requirement" && (
    <div className="space-y-4 mt-6">
      <h2>Total Requirements Created ({tenantRequirements?.length})</h2>
      {tenantRequirements?.length > 0 ? (
        <TenantCreateRequirement />
      ) : (
        <p>No requirements found.</p>
      )}
    </div>
  )}
  {toggle === "saved" && (
    <div className="space-y-4 mt-6">
      <h2>Total Requirements Created ({tenant?.bookmarks?.length})</h2>
      {tenantRequirements?.length > 0 ? (
        <SavedRooms />
      ) : (
        <p>No requirements found.</p>
      )}
    </div>
  )}
  {toggle === "query" && (
    <div>
      Query A Content
    </div>
  )}
</div>

    </div>
  );
};

export default TenantProfile;
