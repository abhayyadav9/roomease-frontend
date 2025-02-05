import React, { useEffect } from "react";
import { useDispatch } from "react-redux"; // Import dispatch
import { setAllTenantData } from "../redux/slice/allTenantSlice";

const useGetAllTenant = () => {
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v4a/get/alltenants"); // Replace with actual API URL
        const data = await response.json();
        if (data.success) {
          dispatch(setAllTenantData(data.tenants)); // Dispatch the action to store data
        }
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };

    fetchTenants();
  }, [dispatch]); // Add dispatch to dependency array

};

export default useGetAllTenant;
