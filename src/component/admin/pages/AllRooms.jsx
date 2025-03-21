import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { Button } from "antd";
import Link from "antd/es/typography/Link";
import { useNavigate } from "react-router-dom";

const AllRooms = () => {
  const [activeTab, setActiveTab] = useState("allrooms");
  const rooms = useSelector((state) => state.room.room);

  const activeRooms = rooms?.filter(
    (room) => room.status === "active" && room.availability === "available"
  );
  const bookedRooms = rooms?.filter((room) => room.availability === "booked");
  const deletedRooms = rooms?.filter((room) => room.status === "inactive");

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          All Rooms Overview
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          View and manage rooms with details like serial number, name, location,
          owner, type, price, availability, status, and more.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          type={activeTab === "allrooms" ? "primary" : "default"}
          onClick={() => setActiveTab("allrooms")}
          className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          All Rooms
        </Button>
        <Button
          type={activeTab === "activerooms" ? "primary" : "default"}
          onClick={() => setActiveTab("activerooms")}
          className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Active Rooms
        </Button>
        <Button
          type={activeTab === "bookedrooms" ? "primary" : "default"}
          onClick={() => setActiveTab("bookedrooms")}
          className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Booked Rooms
        </Button>
        <Button
          type={activeTab === "deletedrooms" ? "primary" : "default"}
          onClick={() => setActiveTab("deletedrooms")}
          className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Deleted Rooms
        </Button>
      </div>

      {/* Room Content */}
      <div className="mt-4">
        {activeTab === "allrooms" && <Rooms rooms={rooms} />}
        {activeTab === "activerooms" && <Rooms rooms={activeRooms} />}
        {activeTab === "bookedrooms" && <Rooms rooms={bookedRooms} />}
        {activeTab === "deletedrooms" && <Rooms rooms={deletedRooms} />}
      </div>
    </div>
  );
};

export default AllRooms;

const Rooms = ({ rooms }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const allOwners = useSelector((state) => state.allOwner?.allOwnerData);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter rooms by address
  const filteredRooms = rooms?.filter((room) =>
    room.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const owner = allOwners?.find((owner) => owner.user._id === rooms.user?._id);
  // Sort rooms based on created date or status
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === "createdAt") {
      return sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "status") {
      return sortOrder === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    return 0;
  });

  // Format date to a readable format
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
    <div className="">
      <div>
        {/* Search & Sorting */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-4">
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
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="createdAt">Date</option>
              <option value="status">Status</option>
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

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Table Container with fixed increased height */}
            <div className="overflow-x-auto">
              <div className="max-h-[600px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        No.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Location
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Owner
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Type
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
                    {sortedRooms
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((room, index) => (
                        <tr
                          key={room._id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {page * rowsPerPage + index + 1}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {room.houseName || "N/A"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {room.address || "N/A"}
                          </td>
                          <td
                            className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300 cursor-pointer"
                            onClick={() =>
                              navigate(`/admin/owner/${room?.user?._id}`)
                            }
                          >
                            <span
                              className="inline-flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors
      bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                            >
                              {room?.owner?.name || "N/A"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
                            {room.roomType || "N/A"}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
                            {room.price || "N/A"}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
                            {room.contactNumber || "N/A"}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
                            {room.availability || "N/A"}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
                            {room.status || "N/A"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {formatDateTime(room.createdAt)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-4">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Showing {page * rowsPerPage + 1} to{" "}
                {Math.min((page + 1) * rowsPerPage, sortedRooms.length)} of{" "}
                {sortedRooms.length} entries
              </span>
              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <button
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={(page + 1) * rowsPerPage >= sortedRooms.length}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setPage(0);
                  }}
                  className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                >
                  {[10, 25, 100].map((value) => (
                    <option key={value} value={value}>
                      {value} per page
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
