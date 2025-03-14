import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FiHome, FiDollarSign, FiMapPin } from "react-icons/fi";
import { setSelectedRoom } from "../../redux/slice/roomSlice";
import ViewRoomDetail from "./ViewRoomDetail";
import { motion } from "framer-motion";
import { LiaSpinnerSolid } from "react-icons/lia";

// Skeleton for when no room data is available.
export const RoomCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="w-full h-56 bg-gray-200" />
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
      </div>
      <div className="space-y-3">
        <div className="h-6 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="h-12 w-full bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);

const RoomCard = ({ room }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenModal = () => {
    dispatch(setSelectedRoom(room));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    // If room data is provided, simulate a delay of 2 seconds.
    if (room) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // If no room data, remove loading state immediately.
      setIsLoading(false);
    }
  }, [room]);

  // Show the spinner while loading.
  if (isLoading) {
    return (
      <motion.div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
        <div className="w-full h-56 bg-gray-200" />
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </div>
          <div className="space-y-3">
            <div className="h-6 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-12 w-full bg-gray-200 rounded-lg" />
          </div>
        </div>
      </motion.div>
    );
  }

  // If no room data is available, render the skeleton.
  if (!room) {
    return <RoomCardSkeleton />;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-xl">
      <img
        src={room?.roomImages?.[0] || "https://via.placeholder.com/300"}
        alt="Room"
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              room?.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {room?.status?.charAt(0).toUpperCase() + room?.status?.slice(1)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          <FiHome className="inline mr-2 text-blue-600" />
          {room?.houseName?.charAt(0).toUpperCase() + room?.houseName?.slice(1)}
        </h3>
        <p className="text-gray-600 mb-2">
          <FiMapPin className="inline mr-2 text-blue-600" />
          {room?.address?.charAt(0).toUpperCase() + room?.address?.slice(1)}
        </p>
        <p className="text-lg font-bold text-gray-900 mb-4">
          <span className="inline mr-2 text-green-600" >Rs :</span>
          {room?.price}/month
        </p>
        <button
          onClick={handleOpenModal}
          className="w-full bg-[#6509F1] hover:bg-[#802FF3] text-white font-medium py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          View Details
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {isModalOpen && <ViewRoomDetail room={room} onClose={handleCloseModal} />}
    </div>
  );
};

export default RoomCard;
