import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetAllRooms from "../hooks/useGetAllRooms";
import { setSelectedRoom } from "../redux/slice/roomSlice";
import ViewRoomDetail from "./commonPage/ViewRoomDetail";
import { CircularProgress } from "@mui/material";
import useGetAllTenant from "../hooks/useGetAllTenant";


const AllRooms = () => {
  useGetAllRooms(); // Fetch all rooms
  useGetAllTenant();

  const rooms = useSelector((state) => state.room?.room);
  const loading = useSelector((state) => state.room?.loading);
  const error = useSelector((state) => state.room?.error);
  const selectedRoom = useSelector((state) => state.room?.selectedRoom);
  const dispatch = useDispatch();

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to open modal with selected room
  const handleOpenModal = (room) => {
    dispatch(setSelectedRoom(room)); // Set room in Redux state
    setIsModalOpen(true); // Open modal
  };

  // Function to close modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  // Filter rooms based on search query (location)
  const filteredRooms = rooms?.filter((room) => {
    const address = room?.address ? room?.address.toLowerCase() : "";
    return address?.includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!rooms || rooms?.length === 0) {
    return <p className="text-center text-gray-600">No available rooms.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🏡 Available Rooms
      </h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms?.map((room) => (
          <div
            key={room?._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105"
          >
            <img
              src={room?.roomImages?.[0] || "https://via.placeholder.com/300"}
              alt="Room"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {room?.houseName}
              </h3>
              <p
                className={`text-sm font-medium ${
                  room?.status === "active" ? "text-green-600" : "text-red-500"
                }`}
              >
                {room?.status.charAt(0).toUpperCase() + room?.status.slice(1)}
              </p>
              <button
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
                onClick={() => handleOpenModal(room)} // Open modal on click
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Room Details Modal */}
      {isModalOpen && selectedRoom && (
        <ViewRoomDetail room={selectedRoom} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AllRooms;