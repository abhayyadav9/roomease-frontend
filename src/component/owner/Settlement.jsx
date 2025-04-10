import React from "react";
import { useSelector } from "react-redux";
import { HomeOutlined, QuestionCircleOutlined, DollarOutlined, TeamOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Settlement = () => {
  // Retrieve data from Redux state
  const loading = useSelector((state) => state?.settlement?.loading);
  const owner = useSelector((state) => state.owner?.data?.data);
  const rooms = useSelector((state) => state.room?.room) || [];
  const navigate= useNavigate()

  // Filter rooms created by the owner
  const filteredRooms = rooms.filter((room) =>
    owner?.createdRooms?.includes(room?._id?.toString())
  );

  // Calculate booked rooms (assumed availability equals "booked")
  const bookedRooms = filteredRooms.filter(
    (room) => room.availability === "booked"
  );

  // Calculate total inquiries from all filtered rooms
  const totalInquiries = filteredRooms.reduce(
    (acc, room) => acc + (room.allQuery?.length || 0),
    0
  );

  // Calculate total revenue from booked rooms (price summed)
  const totalPrice = bookedRooms.reduce(
    (acc, room) => acc + (room.price || 0),
    0
  );

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="text-white text-lg">Loading Financial Summary...</div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 dark:bg-gray-900">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-800 text-center mb-8"
      >
        Financial Dashboard
      </motion.h1>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >


         {/* Total Booked Rooms */}
         <div className="rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 bg-white">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <TeamOutlined className="text-2xl text-yellow-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total  Rooms</h3>
              <p className="text-2xl font-bold text-gray-800">{filteredRooms?.length}</p>
            </div>
          </div>
        </div>
        {/* Total Booked Rooms */}
        <div className="rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 bg-white">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <HomeOutlined className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Booked Rooms</h3>
              <p className="text-2xl font-bold text-gray-800">{bookedRooms.length}</p>
            </div>
          </div>
        </div>

        {/* Total Inquiries */}
        <div className="rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 bg-white">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <QuestionCircleOutlined className="text-2xl text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Inquiries</h3>
              <p className="text-2xl font-bold text-gray-800">{totalInquiries}</p>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 bg-white">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <DollarOutlined className="text-2xl text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-800">
                ₹{totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Booked Rooms Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white shadow-lg rounded-xl overflow-hidden"
      >
        <div className="px-4 py-3 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Bookings Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Room Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookedRooms.map((room, index) => (
                <tr key={room._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {room.houseName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {room.bookingDate || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    ₹{room.price?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                      room.availability === "booked"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {room.availability.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button 
                      type="link" 
                      className="p-0 text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => navigate(`/room/${room._id}` )}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
              {bookedRooms.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Settlement;
