import React from "react";
import { useSelector } from "react-redux";
import useGetOwnerDetails from "../../hooks/ownerHooks/useGetOwnerDetails";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import OwnerCreatedRoom from "./OwnerCreatedRoom";

const OwnerProfile = () => {
  const owner = useSelector((state) => state.owner.data?.data);
  const loading = useSelector((state) => state.owner.loading);
  const error = useSelector((state) => state.owner.error);
  

  useGetOwnerDetails(); // Fetch owner details

  if (loading) {
    return <p className="text-gray-600 text-center">Loading owner details...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (!owner) {
    return <p className="text-gray-600 text-center">No owner details found.</p>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      
      <div className="bg-white relative shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        {/* Action Buttons */}
        <div className="mt-10">
        <h2 className="text-3xl font-bold text-gray-900">Owner Profile</h2>
      </div>
        <div className="absolute top-4 right-4 flex space-x-3 mt-14">
          <Link to="/update-detail" className="text-gray-600 hover:text-green-900 transition">
            <LiaUserEditSolid size={24} />
          </Link>
          <Link to="/add-room" className="text-gray-600 hover:text-green-900 transition">
            <MdAddCircleOutline size={24} />
          </Link>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center mt-10 sm:items-start sm:space-x-6">
          <img
            className="h-20 w-20 rounded-full border border-gray-300"
            src={owner.ownerPic || "https://via.placeholder.com/150"}
            alt="Profile"
          />
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            <h1 className="text-2xl font-semibold text-gray-900">{
            owner.name?.toUpperCase()
              
              
              }</h1>
            <p className="text-gray-600">Email: {owner.user?.email}</p>
            <p className="text-gray-600">Phone: {owner.phone}</p>
            <p className="text-gray-600">Address:{owner.address}</p>
          </div>
        </div>

        {/* Created Rooms Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Created Rooms ({owner.createdRooms?.length || 0})
          </h2>
          {/* {owner.createdRooms?.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {owner.createdRooms.map((room) => (
                <li key={room._id} className="bg-gray-100 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">{room.name}</h3>
                  <p className="text-gray-700">{room.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 mt-4">No rooms created yet.</p>
          )} */}
        </div>
        
        {/* Owner Created Room Component */}
        <OwnerCreatedRoom  />
      </div>
    </div>
  );
};

export default OwnerProfile;
