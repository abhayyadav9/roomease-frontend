import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FiHome, FiDollarSign, FiMapPin } from "react-icons/fi";
import { setSelectedRoom } from "../../redux/slice/roomSlice";
import ViewRoomDetail from "./ViewRoomDetail";

const RoomCard = ({ room }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    dispatch(setSelectedRoom(room));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-xl">
      <img
        src={room?.roomImages?.[0] || "https://via.placeholder.com/300"}
        alt="Room"
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
            room?.status === "active" 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {room?.status?.charAt(0).toUpperCase() + room?.status?.slice(1)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          <FiHome className="inline mr-2 text-blue-600" />
          {room?.houseName}
        </h3>
        <p className="text-gray-600 mb-2">
          <FiMapPin className="inline mr-2 text-blue-600" />
          {room?.address}
        </p>
        <p className="text-lg font-bold text-gray-900 mb-4">
          <FiDollarSign className="inline mr-2 text-green-600" />
          {room?.price}/month
        </p>
        <button
          onClick={handleOpenModal}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          View Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {isModalOpen && (
        <ViewRoomDetail room={room} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default RoomCard;