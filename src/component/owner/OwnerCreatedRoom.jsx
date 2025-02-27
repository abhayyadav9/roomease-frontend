import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { setSelectedRoom } from "../../redux/slice/roomSlice";
import { useNavigate } from "react-router-dom";

const OwnerCreatedRoom = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const rooms = useSelector((state) => state.room?.room) || [];
  const owner = useSelector((state) => state.owner?.data?.data);
    useEffect(() => {
      if (!owner) {
        navigate("/login");
      }
    }, [owner, navigate]);
    

  useEffect(() => {
    if (rooms?.length && owner?.createdRooms?.length) {
      setLoading(false);
    }
  }, [rooms, owner]);



  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const filteredRooms = rooms.filter((room) =>
    owner?.createdRooms?.includes(room?._id?.toString())
  );



  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        🏡 Your Created Rooms
      </h2>

      {/* Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms?.map((room) => (
          <div
            key={room?._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 cursor-pointer"
          >
            <img
              src={room.roomImages?.[0] || "https://via.placeholder.com/300"}
              alt="Room"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Address: {room?.address}</h3>
              <p
                className={`text-sm font-medium ${
                  room?.status === "active" ? "text-green-600" : "text-gray-500"
                }`}
              >
                {room?.houseName}
              </p>
              {/* 🔹 Only this button opens the edit form */}
              <button
                onClick={() => {
                  dispatch(setSelectedRoom(room));
                  
                   navigate("/edit-room");
        
                }}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
              >
                Edit Room
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRooms?.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No rooms found.</p>
      )}
    </div>
  );
};

export default OwnerCreatedRoom;