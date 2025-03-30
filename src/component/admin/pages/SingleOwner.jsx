import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaIdBadge,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASEURL from "../../../utils/BaseUrl";
import { useParams } from "react-router-dom";
import OwnerCreatedRoom from "../../owner/OwnerCreatedRoom";
import { Button } from "antd";

const SingleOwner = () => {
  const dispatch = useDispatch();
  const [owner, setOwner] = useState(null);
  const { id } = useParams();
  const rooms = useSelector((state) => state.room?.room);

  // Delete handler (implement delete logic as needed)
  const handleDelete = () => {
    // dispatch(deleteOwner(owner._id));
  };

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/api/v2/owner-details/${id}`,
          { withCredentials: true }
        );
        setOwner(response?.data.data);
      } catch (err) {
        console.error("Failed to fetch owner details:", err);
      }
    };

    fetchOwnerDetails();
  }, [id, dispatch]);

  // If owner data is not yet loaded, display a centered loading spinner.
  if (!owner) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const filteredRooms = rooms.filter((room) =>owner?.createdRooms?.includes(room?._id?.toString()))
  const activeRooms = filteredRooms?.filter((room) => room.status === "active" && room.availability === "available");
  const bookedRooms = filteredRooms.filter((room) => room.availability === "booked");
  const totalPrice = bookedRooms.reduce((acc, room) => acc + room.price, 0);

  const totalRooms = activeRooms.length + bookedRooms.length;
  return (
    <div>
      <div className="max-w-6xl mx-auto mt-16 p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div className="flex justify-center mb-8">
          <p className="text-3xl"> Owner Detail</p>
        </div>
        {/* Delete Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={handleDelete}
            className="px-6 py-2 rounded-lg flex items-center transition-colors duration-200 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
          >
            <FaTrash className="mr-2" />
            Delete Owner
          </button>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center mb-12 space-y-8 md:space-y-0 md:space-x-12">
          <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-md bg-gray-50 dark:bg-gray-800">
            {owner?.ownerPic ? (
              <img
                src={owner.ownerPic}
                alt={owner.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaUser className="text-6xl text-blue-500 dark:text-blue-400 opacity-75" />
              </div>
            )}
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2 flex items-center justify-center md:justify-start">
              <FaIdBadge className="mr-3 text-blue-500 dark:text-blue-400" />
              {owner?.name}
            </h1>
            <div className="space-y-2">
              {owner?.email && (
                <p className="text-lg flex items-center justify-center md:justify-start">
                  <FaEnvelope className="mr-2 text-blue-500 dark:text-blue-400" />
                  {owner.email}
                </p>
              )}
              {owner?.phone && (
                <p className="text-lg flex items-center justify-center md:justify-start">
                  <FaPhone className="mr-2 text-blue-500 dark:text-blue-400" />
                  {owner.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="p-6 rounded-xl bg-gray-200 dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-blue-500 dark:text-blue-400">
              Member Since
            </h3>
            <p className="opacity-75 dark:opacity-90">
              {owner?.createdAt &&
                new Date(owner.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-200 dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-blue-500 dark:text-blue-400">
              Total  Earned
            </h3>
            <p className="opacity-75 dark:opacity-90">
              {totalPrice}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-blue-500 dark:text-blue-400">
              Active Room
            </h3>
            <p className="opacity-75 dark:opacity-90">
              {activeRooms.length}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-blue-500 dark:text-blue-400">
              Booked Room
            </h3>
            <p className="opacity-75 dark:opacity-90">
              {bookedRooms?.length}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-blue-500 dark:text-blue-400">
              Verification Status
            </h3>
            <p className="opacity-75 dark:opacity-90">
              {owner?.user?.isVerified
                ? "✅ Verified Host"
                : "⏳ Pending Verification"}
            </p>
          </div>
        </div>

        <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-10">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FaHome className="mr-2 text-blue-500 dark:text-blue-400" />
            Managed Properties
          </h2>
        </div>

  
        {/* Room Content */}
        <div className="mt-4">

        <OwnerCreatedRoom owner={owner} role={"admin"} />

        </div>

        {/* Created Rooms Section */}
      </div>
    </div>
  );
};

export default SingleOwner;
