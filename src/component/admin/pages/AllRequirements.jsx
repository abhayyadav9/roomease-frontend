import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const AllRequirements = () => {
  const [activeTab, setActiveTab] = useState("allrequirements");
  const requirements = useSelector(
    (state) => state.requirement?.requirements?.requirement?.requirements
  );
  const activeRequirements = requirements?.filter(
    (requirements) =>
      requirements.status === "active" &&
      requirements.availability === "notfound"
  );
  const foundRequirements = requirements?.filter(
    (requirements) =>
      requirements.availability === "found" && requirements.status === "active"
  );
  const deletedRequirements = requirements?.filter(
    (requirements) => requirements.status === "inactive"
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          Requirements Management
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Track and manage all tenant requirements with detailed information
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          type={activeTab === "allrequirements" ? "primary" : "default"}
          onClick={() => setActiveTab("allrequirements")}
          className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          All Rooms
        </Button>
        <Button
          type={activeTab === "activerequirements" ? "primary" : "default"}
          onClick={() => setActiveTab("activerequirements")}
          className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Active requirements
        </Button>
        <Button
          type={activeTab === "foundrequirements" ? "primary" : "default"}
          onClick={() => setActiveTab("foundrequirements")}
          className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Found as per requirements
        </Button>
        <Button
          type={activeTab === "deletedrequirements" ? "primary" : "default"}
          onClick={() => setActiveTab("deletedrequirements")}
          className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Deleted Requirements
        </Button>
      </div>

      {/* Room Content */}
      <div className="mt-4">
        {activeTab === "allrequirements" && (
          <Requirements requirements={requirements} />
        )}
        {activeTab === "activerequirements" && (
          <Requirements requirements={activeRequirements} />
        )}
        {activeTab === "foundrequirements" && (
          <Requirements requirements={foundRequirements} />
        )}
        {activeTab === "deletedrequirements" && (
          <Requirements requirements={deletedRequirements} />
        )}
      </div>
    </div>
  );
};

export default AllRequirements;

const Requirements = ({ requirements }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredRequirements = requirements?.filter((requirement) =>
    requirement.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRequirements = [...filteredRequirements]?.sort((a, b) => {
    if (sortBy === "createdAt") {
      return sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "status") {
      return sortOrder === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else if (sortBy === "priceRange") {
      return sortOrder === "asc"
        ? a.priceRange - b.priceRange
        : b.priceRange - a.priceRange;
    }
    return 0;
  });

  const formatDateTime = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg  mx-2 mt-8">
      {/* Header */}

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="createdAt">Date</option>
            <option value="status">Status</option>
            <option value="priceRange">Price</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tenant
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Availability
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date Created
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
                  {sortedRequirements
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((requirement) => (
                      <tr
                        key={requirement._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                          {requirement.location || "N/A"}
                        </td>

                        <td
                          className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300 cursor-pointer"
                          onClick={() =>
                            navigate(`/admin/tenant/${requirement?.tenant?.user}`)
                          }
                        >
                          <span
                            className="inline-flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors
      bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                          >
                            {requirement.tenant?.name || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                          {requirement.category || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
                          Rs {requirement.priceRange || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
                          {requirement.additionalNumber || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
                          {requirement.availability || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              requirement.status === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            }`}
                          >
                            {requirement.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                          {formatDateTime(requirement.createdAt)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-6">
            <span className="text-sm text-gray-700 dark:text-gray-300 mb-4 md:mb-0">
              Showing {page * rowsPerPage + 1} to{" "}
              {Math.min((page + 1) * rowsPerPage, sortedRequirements.length)} of{" "}
              {sortedRequirements.length} entries
            </span>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
              >
                Previous
              </button>

              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setPage(0);
                }}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              >
                {[10, 25, 100].map((value) => (
                  <option key={value} value={value}>
                    Show {value}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setPage(page + 1)}
                disabled={(page + 1) * rowsPerPage >= sortedRequirements.length}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
