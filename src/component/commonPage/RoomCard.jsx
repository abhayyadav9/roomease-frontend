import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FiHome, FiDollarSign, FiMapPin } from "react-icons/fi";
import { setSelectedRoom } from "../../redux/slice/roomSlice";
import ViewRoomDetail from "./ViewRoomDetail";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced Skeleton Loader with animations
export const RoomCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden"
  >
    <div className="w-full h-56 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse" />
    <div className="p-5 space-y-4">
      <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse" />
      <div className="space-y-2">
        <div className="h-5 w-4/5 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
    </div>
  </motion.div>
);

const RoomCard = ({ room }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  // Immediately return if no active room
  if (!room || room?.status !== 'active') return null;

  const handleOpenModal = () => {
    dispatch(setSelectedRoom(room));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => setContentLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!contentLoaded ? (
        <RoomCardSkeleton />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1.5 group"
        >
          {/* Image Section */}
          <div className="relative h-56 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 0 : 1 }}
              className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200"
            />
            <motion.img
              src={room?.roomImages?.[0] || "https://via.placeholder.com/300"}
              alt="Room"
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Status Badge */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="absolute top-3 left-3"
            >
              <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Available Now
              </span>
            </motion.div>
          </div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-5 space-y-4"
          >
            {/* Title and Price */}
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-900">
                {room?.houseName}
              </h3>
              <p className="text-lg font-bold text-green-600 flex items-center">
                <h2>Rs.</h2>
                {new Intl.NumberFormat().format(room?.price)}
                <span className="text-sm font-normal text-gray-500">/mo</span>
              </p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 text-gray-600">
              <FiMapPin className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="leading-snug">{room?.address}</p>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="grid grid-cols-3 gap-2 text-sm"
            >
              {[
                // { value: room?.bedrooms, label: 'Beds' },
                // { value: room?.bathrooms, label: 'Baths' },
                // { value: room?.squareFootage, label: 'ft²' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 px-3 py-2 rounded-lg text-center"
                >
                  <span className="block font-medium text-gray-900">
                    {feature.value}
                  </span>
                  <span className="text-gray-500">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenModal}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              View Details
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
            </motion.button>
          </motion.div>

          {/* Modal */}
          {isModalOpen && (
            <ViewRoomDetail room={room} onClose={handleCloseModal} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoomCard;