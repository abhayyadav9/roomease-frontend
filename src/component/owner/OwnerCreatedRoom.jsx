// make this component systematic and well managed for the booked and availibilyty  and incative"delete" and make it professional

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Spin, Modal } from "antd";
import axios from "axios";
import { setSelectedRoom, updateRoomAvailability, updateRoomStatus } from "../../redux/slice/roomSlice";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete, MdReport } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import BASEURL from "../../utils/BaseUrl";

const OwnerCreatedRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState(null);

  const rooms = useSelector((state) => state.room?.room) || [];
  const owner = useSelector((state) => state.owner?.data?.data);

  useEffect(() => {
    if (!owner) navigate("/login");
  }, [owner, navigate]);

  useEffect(() => {
    if (rooms?.length && owner?.createdRooms?.length) setLoading(false);
  }, [rooms, owner]);

  const filteredRooms = rooms.filter((room) =>
    owner?.createdRooms?.includes(room?._id?.toString())
  );

  const handleStatusUpdate = async (roomId, status) => {
    try {
      await axios.put(
        `${BASEURL}/api/v2a/edit/room/${roomId}`,
        { status },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(updateRoomStatus({ roomId, status }));
      setError(null);
    } catch (error) {
      console.error("Status update failed:", error);
      setError("Failed to update room status. Please try again.");
    }
  };

  const handleAvailability = async (roomId, availability) => {
    try {
      await axios.put(
        `${BASEURL}/api/v2a/edit/room/${roomId}`,
        { availability },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(updateRoomAvailability({ roomId, availability }));
      setError(null);
    } catch (error) {
      console.error("Status update failed:", error);
      setError("Failed to update room status. Please try again.");
    }
  };

  const showDeleteConfirmation = (roomId) => {
    setSelectedRoom(roomId);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await handleStatusUpdate(selectedRoom, "inactive");
      setIsDeleteModalVisible(false);
    } catch (error) {
      console.error("Deletion failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const MenuContent = ({ roomId }) => (
    <div className="space-y-2 p-2 min-w-[180px]">
      <div
        className="flex items-center gap-6 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
        onClick={() => showDeleteConfirmation(roomId)}
      >
        <MdDelete className="text-red-500 w-5 h-5" />
        <span className="text-gray-700 font-medium">Delete</span>
      </div>

      <div
        className="flex items-center gap-6 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
        onClick={() => handleAvailability(roomId, "booked")}
      >
        <IoCheckmarkDoneCircle className="text-emerald-500 w-5 h-5" />
        <div>
          <p className="text-gray-700 font-medium">Booked</p>
          <p className="text-xs text-gray-400">Set as unavailable</p>
        </div>
      </div>

      <div className="flex items-center gap-6 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
        <MdReport className="text-blue-500 w-5 h-5" />
        <span className="text-gray-700 font-medium">Generate Report</span>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        🏡 Your Created Rooms
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      <Modal
        title="Confirm Deletion"
        visible={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to Delete this Room?</p>
        <p className="text-sm text-gray-500 mt-2">
          This will remove the room from public listings.
        </p>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms
          ?.filter((room) => room.status === "active")
          .map((room) => (
            <div
              key={room?._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-95 cursor-pointer relative"
            >
              <div className="absolute right-2 top-2 z-10">
                <Popover
                  content={<MenuContent roomId={room._id} />}
                  overlayClassName="shadow-lg rounded-xl"
                  trigger="click"
                >
                  <button className="p-2 bg-white hover:bg-gray-50 rounded-full transition-all shadow-sm hover:shadow-md">
                    <BsThreeDots className="text-gray-600 text-xl transform transition-transform hover:scale-110" />
                  </button>
                </Popover>
              </div>

              <div className="relative h-48">
                <img
                  src={
                    room.roomImages?.[0] || "https://via.placeholder.com/300"
                  }
                  alt="Room"
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute bottom-2 left-2 px-3 py-1 rounded-full text-sm ${
                    room.status === "active"
                      ? "bg-green-600 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  Status: {room.status}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">
                  {room.houseName}
                </h3>
                <p className="text-gray-600 text-sm truncate">{room.address}</p>
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
