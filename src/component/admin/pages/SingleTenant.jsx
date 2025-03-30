import React from "react";
import { useParams } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaIdBadge,
  FaTrash,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import TenantCreateRequirement from "../../tenant/TenantCreateRequirement";

const SingleTenant = () => {
  const { userId } = useParams();
  const allTenants = useSelector((state) => state.allTenant?.allTenantData);
  const requirements = useSelector(
    (state) => state.requirement.requirements.requirement.requirements
  );
  // Corrected find function
  const tenant = allTenants?.find((tenant) => tenant.user?._id === userId);
  const currentRequirements = requirements.filter(
    (req) =>
      req?.tenant?.user === userId &&
      req.availability === "notfound" &&
      req.status === "active"
  );


  const handleDelete = () => {
    // Implement delete logic
  };

  if (!allTenants) return <div>Loading tenants...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="flex justify-center mb-8">
        <p className="text-3xl"> Tenant Detail</p>
      </div>
      {/* Delete Button */}
      <div className="flex justify-end mb-8">
        <button
          onClick={handleDelete}
          className="px-6 py-2 rounded-lg flex items-center transition-colors duration-200 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
        >
          <FaTrash className="mr-2" />
          Delete Tenant
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center mb-12 space-y-8 md:space-y-0 md:space-x-12">
        <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-md bg-gray-50 dark:bg-gray-800">
          {tenant?.tenantPic ? (
            <img
              src={tenant.tenantPic}
              alt={tenant?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaUser className="text-6xl text-blue-500 dark:text-blue-400 opacity-75" />
            </div>
          )}
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center md:justify-start">
            <FaIdBadge className="mr-3 text-blue-500 dark:text-blue-400" />
            {tenant?.name}
          </h1>

          <div className="space-y-2">
            {tenant?.user?.email && (
              <p className="text-lg flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-2 text-blue-500 dark:text-blue-400" />
                {tenant.user.email}
              </p>
            )}
            {tenant?.user?.phone && (
              <p className="text-lg flex items-center justify-center md:justify-start">
                <FaPhone className="mr-2 text-blue-500 dark:text-blue-400" />
                {tenant.user.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-2 text-blue-500 dark:text-blue-400">
            Member Since
          </h3>
          <p className="opacity-75 dark:opacity-90">
            {new Date(tenant?.user?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-2 text-blue-500 dark:text-blue-400">
            Verification Status
          </h3>
          <p className="opacity-75 dark:opacity-90">
            {tenant?.user?.isVerified
              ? "✅ Verified"
              : "⏳ Pending Verification"}
          </p>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-10">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FaHome className="mr-2 text-blue-500 dark:text-blue-400" />
          Tenant Requirements
        </h2>

        {tenant?.requiredCreate?.length > 0 ? (
            <TenantCreateRequirement tenantRequirements={currentRequirements} role={"admin"} />        ) : (
          <div className="text-center py-12 rounded-xl bg-gray-50 dark:bg-gray-800">
            <p className="opacity-75 dark:opacity-90 text-lg">
              No requirements listed
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTenant;
