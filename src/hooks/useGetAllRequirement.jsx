import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setRequirements } from "../redux/slice/requirementSlice";
import BASEURL from "../utils/BaseUrl";

const useGetAllRequirement = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(0); // State to trigger refreshes

  const refreshData = () => {
    setRefresh(prev => prev + 1); // Increment to trigger useEffect
  };

  useEffect(() => {
    const fetchAllRequirement = async () => {
      try {
        const response = await axios.get(`${BASEURL}/api/v3a/all/requirements`, {
          withCredentials: true,
        });

        console.log("API Response:", response.data);

        // Dispatch action to update Redux store
        dispatch(setRequirements({ requirement: response?.data || [] }));

      } catch (error) {
        console.error("Failed to fetch requirements:", error);
      }
    };

    fetchAllRequirement();
  }, [dispatch, refresh]); // Add refresh to dependencies

  return { refreshData }; // Return refresh function for external triggers
};

export default useGetAllRequirement;