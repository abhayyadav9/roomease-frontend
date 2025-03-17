import React, { useState, useEffect } from "react";
import { Modal, Carousel, Tag, Button, message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASEURL from "../../utils/BaseUrl";
import useGetAllRooms from "../../hooks/useGetAllRooms";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setBookmarks } from "../../redux/slice/tenantSlice";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { motion } from "framer-motion";
import { addNotification } from "../../redux/slice/notificationSlice";

const ViewRoomDetail = ({ onClose }) => {
  useGetAllRooms(); // Fetch all rooms

  const [visible, setVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [hasApplied, setHasApplied] = useState(false); // Track if the user has applied
  const [save, setSave] = useState(false);
  const tenant = useSelector((state) => state.tenant.data?.data);

  const rooms = useSelector((state) => state.room?.room);
  const user = useSelector((state) => state.auth?.user);
  const selectedRoom = useSelector((state) => state.room?.selectedRoom);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      if (!user) {
        toast("Please login first to apply");
        navigate("/login");
      } else {
        const res=await axios.post(
          `${BASEURL}/api/v5/apply/${selectedRoom?._id}`,
          {}, // No request body needed
          { withCredentials: true }
        );
        dispatch(addNotification(res.data.notification))

        // ✅ Update UI
        setHasApplied(true);
        message.success("Applied for the room successfully!");
      }
    } catch (error) {
      console.error(
        "Error applying for room:",
        error.response?.data?.message || error
      );
      message.error(error.response?.data?.message || "Failed to apply.");
    }
  };

  if (!selectedRoom) return null; // Safeguard if no room is selected
  // handle save

  const saveHandler = async () => {
    if (!user) {
      toast("Please login first to save");
      navigate("/login");
    }else{
    try {
      const response = await axios.post(
        `${BASEURL}/api/v3/save-room/${selectedRoom?._id}`,
        {},
        { withCredentials: true }
      );

      if (response.data?.message === "saved") {
        setSave(true);
        message.success("Room saved to bookmarks");
      } else {
        setSave(false);
        message.success("Room removed from bookmarks");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Bookmark update failed");
      navigate("/login")
    }
  }
  };


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
            selectedRoom.roomImages?.map((img, index) => (
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
              selectedRoom?.roomImages?.[currentImage] ||
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

      
    

        {/* Detail Grid */}
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          {[
            { label: "Type", value: selectedRoom?.roomType },
            { label: "Price", value: `Rs. ${selectedRoom?.price}/mo` },
            { label: "Contact", value: selectedRoom?.contactNumber || "N/A" },
            { label: "Location", value: selectedRoom?.address || "Hidden" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span className="font-medium text-gray-500">{item.label}:</span>
              <span className="font-semibold">{item.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
          {user?.role !== "owner" && (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  onClick={saveHandler}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  type="text"
                >
                  {save ? (
                    <FaBookmark className="text-blue-600" />
                  ) : (
                    <FaRegBookmark />
                  )}
                  <span>{save ? "Saved" : "Save"}</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  onClick={handleApply}
                  disabled={hasApplied}
                  className={`flex items-center gap-2 ${
                    hasApplied
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  } px-6 py-3 rounded-lg transition-all`}
                >
                  {hasApplied ? "Application Sent" : "Apply Now"}
                </Button>
              </motion.div>
            </>
          )}

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200"
            >
              Close
            </Button>
          </motion.div>
        </div>      
      </div>
    </Modal>
  );
};

export default ViewRoomDetail;
