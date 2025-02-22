import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetAllRooms from "../hooks/useGetAllRooms";
import { setSelectedRoom } from "../redux/slice/roomSlice";
import ViewRoomDetail from "./commonPage/ViewRoomDetail";
import { CircularProgress, Pagination } from "@mui/material";
import useGetAllTenant from "../hooks/useGetAllTenant";
import { FiSearch, FiHome, FiDollarSign, FiMapPin } from "react-icons/fi";

const AllRooms = () => {
  useGetAllRooms();
  useGetAllTenant();

  const rooms = useSelector((state) => state.room?.room);
  const loading = useSelector((state) => state.room?.loading);
  const error = useSelector((state) => state.room?.error);
  const selectedRoom = useSelector((state) => state.room?.selectedRoom);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const filteredRooms = rooms?.filter((room) => {
    const address = room?.address ? room?.address.toLowerCase() : "";
    return address?.includes(searchQuery.toLowerCase());
  });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = filteredRooms?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((filteredRooms?.length || 0) / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenModal = (room) => {
    dispatch(setSelectedRoom(room));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (filteredRooms?.length <= itemsPerPage) {
      setCurrentPage(1);
    }
  }, [filteredRooms, itemsPerPage]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 mt-16">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-pulse">
          🏡 Loading Rooms...
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-200" />
              <div className="p-4 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-10 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-16 p-8 bg-red-50 rounded-lg mx-4">
        <p className="text-red-600 font-semibold text-xl">
          ⚠️ Error loading rooms: {error}
        </p>
      </div>
    );
  }

  if (!rooms || rooms?.length === 0) {
    return (
      <div className="text-center mt-16 p-8 bg-blue-50 rounded-lg mx-4">
        <p className="text-gray-600 text-xl font-medium">
          🏘️ No available rooms at the moment. Please check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🏡 Available Rooms
      </h2>

      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <FiSearch className="absolute left-4 top-4 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search by location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {filteredRooms.length === 0 ? (
        <div className="text-center p-8 bg-yellow-50 rounded-lg">
          <p className="text-gray-600 text-lg">
            🔍 No rooms found matching your search criteria
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                <img
                  src={room.roomImages?.[0] || "https://via.placeholder.com/300"}
                  alt="Room"
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      room.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    <FiHome className="inline mr-2 text-blue-600" />
                    {room.houseName}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <FiMapPin className="inline mr-2 text-blue-600" />
                    {room.address}
                  </p>
                  <p className="text-lg font-bold text-gray-900 mb-4">
                    <FiDollarSign className="inline mr-2 text-green-600" />
                    {room.price}/month
                  </p>
                  <button
                    onClick={() => handleOpenModal(room)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
              className="[&_.MuiPaginationItem-root]:h-10 [&_.MuiPaginationItem-root]:min-w-10"
            />
          </div>

          <p className="text-center text-gray-600 mt-4">
            Showing {currentRooms.length} of {filteredRooms.length} properties
          </p>
        </>
      )}

      {isModalOpen && selectedRoom && (
        <ViewRoomDetail room={selectedRoom} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AllRooms;