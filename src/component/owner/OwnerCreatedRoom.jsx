import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Spin, Modal, Button, message } from "antd";
import axios from "axios";
import { setSelectedRoom } from "../../redux/slice/roomSlice";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete, MdReport } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import BASEURL from "../../utils/BaseUrl";
import useGetAllRooms from "../../hooks/useGetAllRooms";

// Constants for room status and availability
const ROOM_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

const ROOM_AVAILABILITY = {
  AVAILABLE: "available", // Corrected: no extra space
  BOOKED: "booked",
};

const OwnerCreatedRoom = ({ owner, role }) => {
  // Custom hook to refresh rooms list
  const { refresh: refreshRooms } = useGetAllRooms();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component state
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("activeRooms");

  // Get rooms from Redux store
  const rooms = useSelector((state) => state.room?.room) || [];

  // Filter rooms that were created by the owner
  const filteredRooms = rooms.filter((room) =>
    owner?.createdRooms?.includes(room?._id?.toString())
  );

  // Create subsets based on room status and availability
  const activeRooms = filteredRooms.filter(
    (room) =>
      room.status === ROOM_STATUS.ACTIVE &&
      room.availability === ROOM_AVAILABILITY.AVAILABLE
  );
  const bookedRooms = filteredRooms.filter(
    (room) =>
      room.status === ROOM_STATUS.ACTIVE &&
      room.availability === ROOM_AVAILABILITY.BOOKED
  );
  const deletedRooms = filteredRooms.filter(
    (room) => room.status === ROOM_STATUS.INACTIVE
  );

  // Redirect to login if no owner exists
  useEffect(() => {
    if (!owner) navigate("/login");
  }, [owner, navigate]);

  // When rooms and owner's createdRooms are loaded, remove the loader
  useEffect(() => {
    if (rooms.length && owner?.createdRooms?.length) setLoading(false);
  }, [rooms, owner]);

  // Function to update room details (status or availability)
  const updateRoom = async (roomId, updateData) => {
    try {
      const { status } = await axios.put(
        `${BASEURL}/api/v2a/edit/room/${roomId}`,
        updateData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return status === 200;
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update room. Please try again.");
      return false;
    }
  };

  // Handler to update room status
  const handleStatusUpdate = async (roomId, status) => {
    const success = await updateRoom(roomId, { status });
    if (success) {
      message.success(`Room marked as ${status}`);
      refreshRooms();
    }
  };

  // Handler to update room availability
  const handleAvailability = async (roomId, availability) => {
    if (!Object.values(ROOM_AVAILABILITY).includes(availability)) {
      setError("Invalid availability value");
      return;
    }

    const success = await updateRoom(roomId, { availability });
    if (success) {
      message.success(
        availability === ROOM_AVAILABILITY.BOOKED
          ? "Room booked successfully. It will be removed from the list."
          : "Room is now available."
      );
      refreshRooms();
    }
  };

  // Confirm deletion by setting the room id and opening modal
  const confirmDelete = (roomId) => {
    setSelectedRoomId(roomId);
    setDeleteModalVisible(true);
  };

  // Handle confirmed deletion by marking the room as inactive
  const handleConfirmDelete = async () => {
    if (await handleStatusUpdate(selectedRoomId, ROOM_STATUS.INACTIVE)) {
      setDeleteModalVisible(false);
    }
  };

  // Content for the room action menu (shown in a popover)
  const MenuContent = ({ roomId, roomStatus, roomAvailability }) => (
    <div className="space-y-2 p-2 min-w-[200px]">
      <ActionItem
        icon={<MdDelete className="text-red-500 w-5 h-5" />}
        label="Delete Room"
        onClick={() => confirmDelete(roomId)}
        danger
      />
      {roomStatus === ROOM_STATUS.ACTIVE &&
        roomAvailability !== ROOM_AVAILABILITY.BOOKED && (
          <ActionItem
            icon={<IoCheckmarkDoneCircle className="text-emerald-500 w-5 h-5" />}
            label="Book Room"
            subLabel="Set as unavailable"
            onClick={() =>
              handleAvailability(roomId, ROOM_AVAILABILITY.BOOKED)
            }
          />
        )}
      {roomStatus === ROOM_STATUS.ACTIVE &&
        roomAvailability === ROOM_AVAILABILITY.BOOKED && (
          <ActionItem
            icon={<IoCheckmarkDoneCircle className="text-green-500 w-5 h-5" />}
            label="Make Available"
            subLabel="Set as active"
            onClick={() =>
              handleAvailability(roomId, ROOM_AVAILABILITY.AVAILABLE)
            }
          />
        )}
      <ActionItem
        icon={<MdReport className="text-blue-500 w-5 h-5" />}
        label="Generate Report"
        onClick={() => navigate(`/reports/${roomId}`)}
      />
    </div>
  );

  // Show a full-screen loader while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <Spin size="large" tip="Loading rooms..." />
      </div>
    );
  }

  // Render the main component UI
  return (
    <div className="container mx-auto px-4 py-6 relative">
      {/* Loader overlay when navigating */}
      {isNavigating && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 flex justify-center items-center z-50">
          <Spin size="large" tip="Navigating..." />
        </div>
      )}

      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-6">
        🏡 Your Created Rooms
      </h2>

      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          type={activeTab === "activeRooms" ? "primary" : "default"}
          onClick={() => setActiveTab("activeRooms")}
          className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Active Rooms
        </Button>
        <Button
          type={activeTab === "bookedRooms" ? "primary" : "default"}
          onClick={() => setActiveTab("bookedRooms")}
          className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Booked Rooms
        </Button>
       {
        role === "admin" &&
        <Button
        type={activeTab === "deletedRooms" ? "primary" : "default"}
        onClick={() => setActiveTab("deletedRooms")}
        className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
      >
        Deleted Rooms
      </Button>
       }
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={deleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this room?</p>
        <p className="text-sm text-gray-500 mt-2">
          This will remove the room from public listings.
        </p>
      </Modal>

      {/* Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === "activeRooms" &&
          activeRooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              onEdit={() => {
                setIsNavigating(true);
                dispatch(setSelectedRoom(room));
                if (role === "owner") {
                  navigate("/edit-room");
                } else {
                  navigate("/admin/edit-room");
                }
              }}
              menuContent={
                <MenuContent
                  roomId={room._id}
                  roomStatus={room.status}
                  roomAvailability={room.availability}
                />
              }
            />
          ))}
        {activeTab === "bookedRooms" &&
          bookedRooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              onEdit={() => {
                setIsNavigating(true);
                dispatch(setSelectedRoom(room));
                navigate("/edit-room");
              }}
              menuContent={
                <MenuContent
                  roomId={room._id}
                  roomStatus={room.status}
                  roomAvailability={room.availability}
                />
              }
            />
          ))}
        {activeTab === "deletedRooms" &&
          deletedRooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              onEdit={() => {
                setIsNavigating(true);
                dispatch(setSelectedRoom(room));
                navigate("/edit-room");
              }}
              menuContent={
                <MenuContent
                  roomId={room._id}
                  roomStatus={room.status}
                  roomAvailability={room.availability}
                />
              }
            />
          ))}
      </div>

      {/* Message when no rooms are found */}
      {filteredRooms.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No rooms found.</p>
      )}
    </div>
  );
};

// Action item component for popover menu actions
const ActionItem = ({ icon, label, subLabel, onClick, danger = false }) => (
  <div
    className={`flex items-center gap-4 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors ${
      danger ? "text-red-600" : "text-gray-700"
    }`}
    onClick={onClick}
  >
    {icon}
    <div>
      <p className="font-medium">{label}</p>
      {subLabel && <p className="text-xs text-gray-400">{subLabel}</p>}
    </div>
  </div>
);

// Room card component to display individual room details
const RoomCard = ({ room, onEdit, menuContent }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-95 cursor-pointer relative">
    <div className="absolute right-2 top-2 z-10">
      <Popover content={menuContent} overlayClassName="shadow-lg rounded-xl" trigger="click">
        <button className="p-2 bg-white hover:bg-gray-50 rounded-full transition-all shadow-sm hover:shadow-md">
          <BsThreeDots className="text-gray-600 text-xl transform transition-transform hover:scale-110" />
        </button>
      </Popover>
    </div>
    <div className="relative h-48">
    <img
  loading="lazy"
  src={room?.roomImages?.[0] || "https://via.placeholder.com/300"}
  alt="Room"
  className="w-full h-full object-cover"
/>

      <div
        className={`absolute bottom-2 left-2 px-3 py-1 rounded-full text-sm ${
          room.status === ROOM_STATUS.ACTIVE
            ? "bg-green-600 text-white"
            : "bg-gray-500 text-white"
        }`}
      >
        Status: {room.status}
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold truncate">{room.houseName}</h3>
      <p className="text-gray-600 text-sm truncate">{room.address}</p>
      <Button
        onClick={onEdit}
        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
      >
        Edit Room
      </Button>
    </div>
  </div>
);

export default OwnerCreatedRoom;
