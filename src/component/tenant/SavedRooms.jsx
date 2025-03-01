import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { setSelectedRoom } from "../../redux/slice/roomSlice";
import RoomCard from "../commonPage/RoomCard";
import ViewRoomDetail from "../commonPage/ViewRoomDetail";

const SavedRooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tenant = useSelector((state) => state.tenant.data?.data);
  const allRooms = useSelector((state) => state.room?.room);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get saved rooms properly
  const savedRooms = allRooms?.filter(room => 
    tenant?.bookmarks?.includes(room?._id)
  );

  const handleOpenModal = (room) => {
    dispatch(setSelectedRoom(room));
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-8 text-center"
      >
        Your Saved Properties
      </motion.h1>

      {savedRooms?.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
        >
          <AnimatePresence>
            {savedRooms?.map((room) => (
              <motion.div
                key={room?._id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl"
              >
                <RoomCard 
                  room={room}
                  onClick={() => handleOpenModal(room)}
                  isBookmarked={true}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-gray-500 text-xl">
            No saved properties yet. Start exploring and save your favorites!
          </p>
          <button
            onClick={() => navigate('/tenant/all-rooms')}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse Properties
          </button>
        </motion.div>
      )}

      {isModalOpen && (
        <ViewRoomDetail
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SavedRooms;