import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASEURL from "../../../utils/BaseUrl";
import { logout as logoutAction } from "../../../redux/slice/authSlice";
import { CiLogout } from "react-icons/ci";

const AdminProfile = () => {
  const loading = useSelector((state) => state.owner.loading);
  const error = useSelector((state) => state.owner.error);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [admin, setAdmin] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adminPic: "",
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/api/v4/admin-details/${user?.id}`,
          {
            withCredentials: true,
          }
        );
        setAdmin(response.data?.data);
        setFormData({
          name: response.data?.data?.user?.name || "",
          email: response.data?.data?.user?.email || "",
          phone: response.data?.data?.user?.phone || "",
          adminPic: response.data?.data?.user?.adminPic || "",
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchAdmin();
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASEURL}/api/v1/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(logoutAction());
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging out");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${BASEURL}/api/v4/admin-details/${user?.id}`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          adminPic: formData.adminPic,
        },
        {
          withCredentials: true,
        }
      );
      setAdmin(response.data?.data);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the changes");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <p className="text-gray-600 text-center">Loading admin details...</p>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (!admin) {
    return <p className="text-gray-600 text-center">No admin details found.</p>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      {/* Logout */}
      <div
        onClick={handleLogout}
        className="flex items-center justify-between w-full px-2 py-1 hover:text-red-900 rounded cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <CiLogout size={24} />
          <span className="text-md">Logout</span>
        </div>
      </div>
      <div className="relative shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        {/* Action Buttons */}
        <div className="mt-10 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Admin Profile</h2>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 px-4 py-2 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          )}
        </div>

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center mt-10 sm:items-start sm:space-x-6">
          <img
            className="h-20 w-20 rounded-full border border-gray-300"
            src={formData.adminPic || "https://via.placeholder.com/150"}
            alt="Profile"
          />
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`text-2xl font-semibold ${
                isEditing ? "border border-gray-300 p-2 rounded" : ""
              }`}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`text-gray-600 ${
                isEditing ? "border border-gray-300 p-2 rounded mt-2" : ""
              }`}
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`text-gray-600 ${
                isEditing ? "border border-gray-300 p-2 rounded mt-2" : ""
              }`}
            />
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default AdminProfile;