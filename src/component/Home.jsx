import React from "react";
import useGetOwnerDetails from "../hooks/ownerHooks/useGetOwnerDetails";
import useGetAllRooms from "../hooks/useGetAllRooms";
import useGetTenantDetails from "../hooks/tenantHooks/usegetTenantDetails";
import useGetAllRequirement from "../hooks/useGetAllRequirement";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  // useGetOwnerDetails();
  //  useGetAllRooms(); // Call the hook
  useGetTenantDetails();
  useGetAllRequirement();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.role ==="tenant") {
      navigate("/tenant/home");
    }
  }, [user, navigate]);

  return (
    <div>
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
            Luxury Ready for Rent
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            Find your dream home with us
          </p>
          <a
            href="/login"
            className="bg-white text-black py-2 px-6 rounded-md text-lg transition duration-300 ease-in-out hover:bg-gray-200"
          >
            Explore Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
