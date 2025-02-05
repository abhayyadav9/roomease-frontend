import React, { useEffect } from "react";
import { useDispatch } from "react-redux"; // Import dispatch
import { setAllOwnerData } from "../redux/slice/allOwnerSlice";

const useGetAllOwner = () => {
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v4a/get/allowners"); // Replace with actual API URL
        const data = await response.json();
        if (data.success) {
          dispatch(setAllOwnerData(data.owners)); // Dispatch the action to store data
        }
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };

    fetchOwners();
  }, [dispatch]); // Add dispatch to dependency array

};

export default useGetAllOwner;
