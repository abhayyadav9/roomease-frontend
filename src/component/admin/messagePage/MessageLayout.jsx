import React, { useState } from "react";
import OwnersMessage from "./OwnersMessage";
import TenantsMessage from "./TenantsMessage";
import AdminMessage from "./AdminMessage";

const MessageLayout = () => {
  const [alignment, setAlignment] = useState("owner");
  const [loading, setLoading] = useState(false);

  const handleChange = (newAlignment) => {
    if (newAlignment !== alignment) {
      // Start loading animation
      setLoading(true);
      // Simulate a loading delay (e.g., fetching data)
      setTimeout(() => {
        setAlignment(newAlignment);
        setLoading(false);
      }, 500); // adjust delay as needed
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[85vh] bg-gray-50 overflow-hidden">
      {/* Left Navigation Panel */}
      <div className="w-full md:w-64 shadow-lg flex flex-col h-full border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Message Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Manage communications</p>
        </div>

        <div className="p-2 bg-gray-100">
          <div className="flex flex-row gap-5 ml-5">
            <button
              onClick={() => handleChange("owner")}
              className={`px-4 py-2 rounded-md text-left transition-colors ${
                alignment === "owner"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300 bg-gray-200"
              }`}
            >
              Owner
            </button>
            <button
              onClick={() => handleChange("tenant")}
              className={`px-4 py-2 rounded-md text-left transition-colors ${
                alignment === "tenant"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300 bg-gray-200"
              }`}
            >
              Tenant
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto ">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
          ) : (
            <>
              {alignment === "owner" && <OwnersMessage />}
              {alignment === "tenant" && <TenantsMessage />}
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className=" h-full overflow-y-auto">
            <AdminMessage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageLayout;
