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

  const filteredRooms = rooms?.filter((room) => {
    const address = room?.address ? room?.address.toLowerCase() : "";
    const roomType = room?.roomType ? room?.roomType.toLowerCase() : "";
    const description = room?.description
      ? room?.description.toLowerCase()
      : "";
    // const [min, max] = searchQuery.split('-');
    // let price=0;

    //     if (room.price >= min && room.price <= max) {
    //  price = room?.price;
    // }

    return (
      address?.includes(searchQuery?.toLowerCase()) ||
      roomType?.includes(searchQuery?.toLowerCase()) ||
      description?.includes(searchQuery?.toLowerCase())
      // price?.includes(min,max)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = filteredRooms?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((filteredRooms?.length || 0) / itemsPerPage);

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
    if (filteredRooms?.length <= itemsPerPage) {
      setCurrentPage(1);
    }
  }, [filteredRooms, itemsPerPage]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 mt-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-6 text-gray-800 animate-pulse"
        >
          🏡 Loading Rooms...
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)]?.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="w-full h-48 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse" />
              <div className="p-4 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-10 bg-gray-200 rounded-lg" />
              </div>
            </motion.div>
          ))}
        </div>
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

  if (!rooms || rooms?.length === 0) {
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
        {/* Filter Card - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block w-full lg:w-1/5 sticky top-14 h-fit pb-4">
          <FilterCard />
        </div>

        {/* Main Content Area */}
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

          {/* Pagination */}
          <div>
            {filteredRooms?.length > 0 ? (
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
                    {filteredRooms?.length}
                  </span>{" "}
                  amazing properties
                </motion.p>
              </div>
            ) : (
              <div>
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-xl font-bold text-left mb-8 text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent"
                >
                  No matching rooms found " {searchQuery}"
                </motion.h2>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && selectedRoom && (
        <ViewRoomDetail room={selectedRoom} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AllRooms;
