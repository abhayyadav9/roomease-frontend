import React, { useState } from "react";
import { Modal, Carousel, Tag, Button } from "antd";
import {
  HomeOutlined,
  DollarOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const ViewRoomDetail = ({ onClose }) => {
  const [visible, setVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const selectedRoom = useSelector((state) => state.room.selectedRoom);

  if (!selectedRoom) return null; // Ensure room data exists

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
            src={selectedRoom.roomImages?.[currentImage] || "https://via.placeholder.com/800x400"}
            alt="Room"
            className="w-full h-auto rounded-lg"
          />
        </Modal>
      </div>

      {/* 📜 Room Details */}
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">{selectedRoom.houseName}</h2>
        <p className="text-gray-600 text-lg">
          {selectedRoom.description || "No description provided."}
        </p>

        {/* 🏠 Room Information */}
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <HomeOutlined className="text-blue-600 text-xl" />
            <span className="font-medium">
              Room Type: <strong>{selectedRoom.roomType}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarOutlined className="text-green-600 text-xl" />
            <span className="font-medium">
              Price: <strong>${selectedRoom.price}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneOutlined className="text-purple-600 text-xl" />
            <span className="font-medium">
              Contact: <strong>{selectedRoom.contactNumber || "N/A"}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <EnvironmentOutlined className="text-red-600 text-xl" />
            <span className="font-medium">
              Address: <strong>{selectedRoom.address || "Not specified"}</strong>
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

        {/* 🔘 Close Button */}
        <Button
          onClick={onClose}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg mt-4 transition-all duration-300"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ViewRoomDetail;
