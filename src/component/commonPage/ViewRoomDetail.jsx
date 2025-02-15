import React, { useState, useEffect } from "react";
import { Modal, Carousel, Tag, Button, message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASEURL from "../../utils/BaseUrl";
import useGetAllRooms from "../../hooks/useGetAllRooms";
import socketService from "../../utils/socket"; // ✅ Import Socket Service
import { addNotification } from "../../redux/slice/notificationSlice";

const ViewRoomDetail = ({ onClose }) => {
  useGetAllRooms(); // Fetch all rooms

  const [visible, setVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [hasApplied, setHasApplied] = useState(false); // Track if the user has applied

  const rooms = useSelector((state) => state.room.room);
  const user = useSelector((state) => state.auth.user);
  const selectedRoom = useSelector((state) => state.room.selectedRoom);
  const dispatch = useDispatch();

  // ✅ Check if user has already applied
  useEffect(() => {
    if (selectedRoom && user) {
      const hasUserApplied = selectedRoom.allQuery?.includes(user.id);
      setHasApplied(hasUserApplied);
    }
  }, [selectedRoom, user]);

  // ✅ Apply for the room and notify the owner
  const handleApply = async () => {
    try {
      await axios.post(
        `${BASEURL}/api/v2a/apply/${selectedRoom._id}`,
        {}, // No request body needed
        { withCredentials: true }
      );

      // Emit notification to the owner
      socketService.sendNotification({
        userId: selectedRoom.owner.user, // Owner ID
        roomId: selectedRoom?._id, // Room ID
        userName: user.name,
        message: `${user.name} has applied for your room: ${selectedRoom.houseName} `,
        houseName:selectedRoom.houseName
      });
      socketService.listenForNotifications((message) => {
               notification.info({
                 message: "New Notification",
                 description: message,
                 placement: "topRight",
               });
              })
      // ✅ Update UI
      setHasApplied(true);
      message.success("Applied for the room successfully!");
    } catch (error) {
      console.error(
        "Error applying for room:",
        error.response?.data?.message || error
      );
      message.error(error.response?.data?.message || "Failed to apply.");
    }
  };

  if (!selectedRoom) return null; // Safeguard if no room is selected

  return (
    <Modal
      title="🏡 Room Details"
      open={true}
      onCancel={onClose} // Ensure the modal can be closed
      footer={null}
      width={800}
      centered
    >
      {/* 🖼️ Room Image Gallery */}
      <div className="relative">
        <Carousel
          afterChange={(index) => setCurrentImage(index)}
          autoplay
          dotPosition="bottom"
          className="rounded-lg overflow-hidden"
        >
          {selectedRoom.roomImages?.length ? (
            selectedRoom.roomImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Room Image ${index + 1}`}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => {
                  setVisible(true);
                  setCurrentImage(index);
                }}
              />
            ))
          ) : (
            <img
              src="https://via.placeholder.com/800x400"
              alt="Placeholder"
              className="w-full h-64 object-cover"
            />
          )}
        </Carousel>

        {/* 🔍 Fullscreen Image Viewer */}
        <Modal
          open={visible}
          footer={null}
          onCancel={() => setVisible(false)}
          centered
        >
          <img
            src={
              selectedRoom.roomImages?.[currentImage] ||
              "https://via.placeholder.com/800x400"
            }
            alt="Room"
            className="w-full h-auto rounded-lg"
          />
        </Modal>
      </div>

      {/* 📜 Room Details */}
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {selectedRoom.houseName}
        </h2>
        <p className="text-gray-600 text-lg">
          {selectedRoom.description || "No description provided."}
        </p>

        {/* 🏠 Room Information */}
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              Room Type: <strong>{selectedRoom.roomType}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              Price: <strong>${selectedRoom.price}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              Contact: <strong>{selectedRoom.contactNumber || "N/A"}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              Address:{" "}
              <strong>{selectedRoom.address || "Not specified"}</strong>
            </span>
          </div>
        </div>

        {/* ✅ Status Indicator */}
        <div className="flex justify-center mt-4">
          <Tag
            color={selectedRoom.status === "active" ? "green" : "red"}
            className="text-lg px-4 py-1"
          >
            {selectedRoom.status === "active" ? "Available" : "Not Available"}
          </Tag>
        </div>

        {/* Apply & Close Buttons */}
        <div className="mt-4 flex flex-col space-y-2">
         {
          user.role !== "owner" && (
            <Button
            onClick={handleApply}
            disabled={hasApplied} // Disable the button if already applied
            className={`${
              hasApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-700"
            } text-white py-2 rounded-lg transition-all duration-300`}
          >
            {hasApplied ? "Already Applied" : "Apply"}
          </Button>
          )
         }

          <Button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-all duration-300"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewRoomDetail;