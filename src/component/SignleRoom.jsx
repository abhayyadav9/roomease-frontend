import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useGetAllRooms from "../hooks/useGetAllRooms";
import { setSelectedRoom } from "../redux/slice/roomSlice";
import ViewRoomDetail from "./commonPage/ViewRoomDetail";
import { CircularProgress, Button } from "@mui/material";
import { Carousel, Modal, Table, Tag } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const SingleRoom = () => {
  useGetAllRooms();
  const { roomId } = useParams();
  const rooms = useSelector((state) => state.room.room);
  const loading = useSelector((state) => state.room.loading);
  const error = useSelector((state) => state.room.error);
  const selectedRoom = useSelector((state) => state.room.selectedRoom);
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notification.notifications
  );

  useEffect(() => {
    if (roomId && rooms.length > 0) {
      const room = rooms.find((room) => room._id === roomId);
      if (room) dispatch(setSelectedRoom(room));
    }
  }, [roomId, rooms, dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!selectedRoom)
    return <p className="text-center text-gray-600">Room not found.</p>;

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <Modal
        title={
          <div className="flex items-center gap-2">
            <Button
              onClick={() => window.history.back()}
              className="flex items-center"
            >
              <LeftOutlined className="mr-1" /> Back
            </Button>
            <span>🏡 Room Details</span>
          </div>
        }
        open={true}
        footer={null}
        width={800}
        centered
      >
        <Carousel
          autoplay
          dotPosition="bottom"
          className="rounded-lg overflow-hidden"
        >
          {selectedRoom.roomImages?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Room ${index}`}
              className="w-full h-64 object-cover"
            />
          ))}
        </Carousel>

        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedRoom.houseName}
          </h2>
          <p className="text-gray-600 text-lg">
            {selectedRoom.description || "No description provided."}
          </p>

          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div>
              Room Type: <strong>{selectedRoom.roomType}</strong>
            </div>
            <div>
              Price: <strong>${selectedRoom.price}</strong>
            </div>
            <div>
              Contact: <strong>{selectedRoom.contactNumber || "N/A"}</strong>
            </div>
            <div>
              Address:{" "}
              <strong>{selectedRoom.address || "Not specified"}</strong>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Tag
              color={selectedRoom.status === "active" ? "green" : "red"}
              className="text-lg px-4 py-1"
            >
              {selectedRoom.status === "active" ? "Available" : "Not Available"}
            </Tag>
          </div>
          <div>
            {notifications.length > 0 ? (
              <Table
                dataSource={notifications}
                columns={[
                  {
                    title: "Applied for this room",
                    dataIndex: "userName",
                    key: "userName",
                    render: (text, record) => (
                      <div>
                        <span>
                            <Link to={`/room/${record?.roomId}`}>
                            {record.userName}</Link>
                        </span>
                      </div>
                    ),
                  },
                ]}
                rowKey="_id"
                pagination={false}
              />
            ) : (
              <p>No notifications</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SingleRoom;
