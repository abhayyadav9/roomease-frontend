import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import useGetAllRooms from "../hooks/useGetAllRooms";
import { setSearchQuery, setSelectedRoom } from "../redux/slice/roomSlice";
import ViewRoomDetail from "./commonPage/ViewRoomDetail";
import { CircularProgress, Pagination } from "@mui/material";
import useGetAllTenant from "../hooks/useGetAllTenant";
import { FiSearch } from "react-icons/fi";
import RoomCard from "./commonPage/RoomCard";
import { FilterCard } from "./commonPage/FilterCard";
import { LiaSpinnerSolid } from "react-icons/lia";

const AllRooms = () => {
  useGetAllRooms();
  useGetAllTenant();

  const rooms = useSelector((state) => state.room?.room);
  const searchQuery = useSelector((state) => state.room?.searchQuery);
  const loading = useSelector((state) => state.room?.loading);
  const error = useSelector((state) => state.room?.error);
  const selectedRoom = useSelector((state) => state.room?.selectedRoom);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Filter active rooms first
  const activeRooms = rooms?.filter(room => room.status === 'active') || [];

  const filteredRooms = activeRooms.filter((room) => {
    const searchLower = searchQuery?.toLowerCase();
    return (
      room?.address?.toLowerCase()?.includes(searchLower) ||
      room?.roomType?.toLowerCase()?.includes(searchLower) ||
      room?.description?.toLowerCase()?.includes(searchLower)
    );
  });

  // Pagination calculations
  const totalRooms = filteredRooms?.length || 0;
  const totalPages = Math.ceil(totalRooms / itemsPerPage);
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalRooms);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentRooms = filteredRooms?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenModal = (room) => {
    dispatch(setSelectedRoom(room));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-blue-600"
        >
          <LiaSpinnerSolid className="w-16 h-16" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="text-center mt-16 p-8 bg-red-50 rounded-lg mx-4"
      >
        <p className="text-red-600 font-semibold text-xl">
          ⚠️ Error loading rooms: {error}
        </p>
      </motion.div>
    );
  }

  if (!activeRooms?.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-16 p-8 bg-blue-50 rounded-lg mx-4"
      >
        <p className="text-gray-600 text-xl font-medium">
          🏘️ No available rooms at the moment. Please check back later!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-center mb-8 text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent"
      >
        Discover Your Perfect Space
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 max-w-2xl mx-auto"
      >
        <div className="relative group">
          <FiSearch className="absolute left-4 top-4 text-gray-400 text-xl transition-transform group-hover:scale-110" />
          <input
            type="text"
            placeholder="Search by location..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-lg hover:shadow-xl"
          />
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-7">
        <div className="hidden lg:block w-full lg:w-1/5 sticky top-14 h-fit pb-4">
          <FilterCard />
        </div>

        <div className="w-full lg:w-4/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentRooms?.map((room) => (
                <motion.div
                  key={room?._id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl"
                >
                  <RoomCard room={room} onClick={() => handleOpenModal(room)} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-2 rounded-full shadow-lg"
              >
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontSize: "1.1rem",
                      margin: "0 4px",
                      transition: "all 0.3s ease",
                    },
                    "& .MuiPaginationItem-page:hover": {
                      transform: "scale(1.1)",
                      backgroundColor: "#3b82f6",
                      color: "white",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#3b82f6!important",
                      color: "white",
                      transform: "scale(1.1)",
                    },
                  }}
                />
              </motion.div>

              <motion.p
                className="text-center text-gray-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Showing{" "}
                <span className="text-blue-600 font-bold">
                  {currentRooms.length}
                </span>{" "}
                of{" "}
                <span className="text-purple-600 font-bold">
                  {totalRooms}
                </span>{" "}
                {totalRooms === 1 ? "property" : "properties"}
              </motion.p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedRoom && (
        <ViewRoomDetail room={selectedRoom} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AllRooms;