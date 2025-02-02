import React from "react";
import { useSelector } from "react-redux";
import { Button, Divider } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AllRequirements from "./AllRequirements";

const TenantProfile = () => {
  const tenant = useSelector((state) => state.tenant?.data?.data);
  const requirements = useSelector((state) => state.requirement.requirements.requirement.requirements)
   const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // ✅ Filter requirements created by this tenant
  const tenantRequirements = requirements.filter(
    (req) => req?.tenant?.user === user?.id
  );

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
            <p className="text-sm text-gray-500">{tenant?.user?.email || "No email provided"}</p>
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
            onClick={() => navigate("/update/tenant/detail")}
          >
            Edit Profile
          </Button>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            size="large"
            className="w-full sm:w-auto"
            onClick={() => navigate("/add-requirement")}
          >
            Add New Requirement
          </Button>
        </div>
      </div>

      {/* Tenant Requirements */}
      <div className="space-y-4 mt-6">
        <h2>Total Requirements Created ({tenantRequirements.length})</h2>

        {/* ✅ Render `AllRequirements` only if there are requirements for this tenant */}
        {tenantRequirements.length > 0 ? <AllRequirements /> : <p>No requirements found.</p>}
      </div>
    </div>
  );
};

export default TenantProfile;
