import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetOwnerDetails from "../../hooks/ownerHooks/useGetOwnerDetails";
import { LiaSpinnerSolid, LiaUserEditSolid } from "react-icons/lia";
import { MdAddCircleOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import OwnerCreatedRoom from "./OwnerCreatedRoom";
import axios from "axios";
import BASEURL from "../../utils/BaseUrl";
import { logout as logoutAction } from "../../redux/slice/authSlice";
import { CiLogout } from "react-icons/ci";
import { setError, setLoading, setOwner } from "../../redux/slice/ownerSlice";

const OwnerProfile = () => {
  const owner = useSelector((state) => state.owner?.data?.data);
  const loading = useSelector((state) => state.owner?.loading);
  const error = useSelector((state) => state.owner?.error);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "owner") {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchOwnerDetails = async () => {
      dispatch(setLoading(true));

      try {
        const response = await axios.get(
          `${BASEURL}/api/v2/owner-details/${user?.id}`,
          { withCredentials: true }
        );
        dispatch(setOwner(response?.data));
      } catch (err) {
        console.error("Failed to fetch owner details:", err);
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchOwnerDetails();
  }, [user?.id, dispatch]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASEURL}/api/v1/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logoutAction());
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging out");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LiaSpinnerSolid className="animate-spin text-indigo-600" size={50} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (!owner) {
    return (
      <p className="text-gray-600 text-center">No owner details found.</p>
    );
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-blue-600"
        >
          <LiaSpinnerSolid className="w-16 h-16" />
        </motion.div>
      </div>
    );
  }


  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (!owner) {
    return <p className="text-gray-600 text-center">No owner details found.</p>;
  }

 
    // ... (keep error and empty states the same)
  
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Owner Dashboard</h2>
            <div className="flex items-center gap-4">
              <Link
                to="/update-detail"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <LiaUserEditSolid className="w-6 h-6 text-white" />
              </Link>
              <Link
                to="/add-room"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <MdAddCircleOutline className="w-6 h-6 text-white" />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <CiLogout className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
  
          {/* Profile Section */}
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative"
              >
                <img
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  src={owner?.ownerPic || "https://via.placeholder.com/150"}
                  alt="Profile"
                />
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
              </motion.div>
  
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 font-serif">
                  {owner?.name?.toUpperCase()}
                </h1>
                <div className="space-y-1 text-gray-600">
                  <p className="flex items-center gap-2">
                    <span className="material-icons">📧</span>
                    {owner?.user?.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="material-icons">📱</span>
                    {owner?.phone || "Not provided"}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="material-icons">📍</span>
                    {owner?.address || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
  
            {/* Stats Section */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-2xl font-bold text-blue-600">
                  {owner?.createdRooms?.length || 0}
                </p>
                <p className="text-sm text-gray-600">Total Listings</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-2xl font-bold text-purple-600">0</p>
                <p className="text-sm text-gray-600">Active Tenants</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-2xl font-bold text-green-600">₹0</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
  
            {/* Created Rooms Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
                Managed Properties
              </h3>
              <OwnerCreatedRoom />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default OwnerProfile;