import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useGetAllRooms from "../hooks/useGetAllRooms";
import { setSelectedRoom } from "../redux/slice/roomSlice";
import { CircularProgress, Button, Typography } from "@mui/material";
import { Carousel, Modal, Table, Tag, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const SingleRoom = () => {
  useGetAllRooms();
  const { roomId } = useParams();
  const rooms = useSelector((state) => state.room.room);
  const loading = useSelector((state) => state.room.loading);
  const error = useSelector((state) => state.room.error);
  const selectedRoom = useSelector((state) => state.room.selectedRoom);
  const dispatch = useDispatch();
  const allTenants = useSelector((state) => state.allTenant?.allTenantData);

  useEffect(() => {
    if (roomId && rooms.length > 0) {
      const room = rooms.find((room) => room._id === roomId);
      if (room) dispatch(setSelectedRoom(room));
    }
  }, [roomId, rooms, dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </div>
    );

  if (!selectedRoom)
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="textSecondary">
          Room not found.
        </Typography>
      </div>
    );

  // Columns for the applicants table
  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <Link
          to={`/admin/tenant/${record.userId}`}
          className="text-blue-500 hover:text-blue-700"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
  ];

  // Prepare data for the applicants table
  const applicantsData = selectedRoom.allQuery?.map((userId) => {
    const tenant = allTenants?.find((tenant) => tenant?.user?._id === userId);
    return {
      key: tenant?.user?._id,
      userName: tenant?.user?.name,
      email: tenant?.user?.email,
      contact: tenant?.user?.contactNumber || "N/A",
      userId: tenant?.user?._id,
    };
  });

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <Modal
        title={
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5" className="font-bold">
              🏡 Room Details
            </Typography>
            <Button
              onClick={() => window.history.back()}
              startIcon={<LeftOutlined />}
              className="flex items-center"
              variant="outlined"
            >
              Back
            </Button>
          </div>
        }
        open={true}
        footer={null}
        width={1000}
        centered
        className="room-details-modal"
      >
        <Carousel
          autoplay
          dotPosition="bottom"
          className="rounded-lg overflow-hidden shadow-lg"
        >
          {selectedRoom.roomImages?.map((img, index) => (
            <div key={index} className="w-full h-96 overflow-hidden">
              <img
                src={img}
                alt={`Room ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Carousel>

        <div className="p-6 space-y-6">
          <Typography variant="h4" className="font-bold text-gray-800">
            {selectedRoom?.houseName}
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            {selectedRoom?.description || "No description provided."}
          </Typography>

          <Space direction="vertical" size="middle" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <Typography variant="subtitle1">
                  Room Type: <strong>{selectedRoom?.roomType}</strong>
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle1">
                  Price: <strong>Rs {selectedRoom?.price}</strong>
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle1">
                  Contact:{" "}
                  <strong>{selectedRoom?.contactNumber || "N/A"}</strong>
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle1">
                  Address:{" "}
                  <strong>{selectedRoom?.address || "Not specified"}</strong>
                </Typography>
              </div>
            </div>

            <div className="flex justify-center">
              <Tag
                color={selectedRoom.availability === "booked" ? "red" : "green"}
                className="text-lg px-4 py-1 rounded-full"
              >
                {selectedRoom.availability === "booked"
                  ? "Not Available"
                  : "Available"}
              </Tag>
            </div>
          </Space>

          <div className="mt-6">
            <Typography variant="h6" className="mb-4">
              Applicants ({selectedRoom.allQuery?.length || 0})
            </Typography>
            {applicantsData?.length > 0 ? (
              <Table
                dataSource={applicantsData}
                columns={columns}
                pagination={false}
                className="shadow-sm"
              />
            ) : (
              <Typography variant="body1" className="text-gray-600">
                No applicants found.
              </Typography>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SingleRoom;