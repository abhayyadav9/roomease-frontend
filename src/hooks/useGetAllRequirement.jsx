import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setRequirements } from "../redux/slice/requirementSlice";
import BASEURL from "../utils/BaseUrl";

const useGetAllRequirement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllRequirement = async () => {
      try {
        const response = await axios.get(`${BASEURL}/api/v3a//all/requirements`, {
          withCredentials: true,
        });

        console.log("API Response:", response.data); // Debugging: Check API response

        // Dispatch action to store the fetched requirements in Redux state
        dispatch(setRequirements({ requirement: response?.data || [] }));

      } catch (error) {
        console.error("Failed to fetch requirements:", error);
      }
    };

    fetchAllRequirement();
  }, [dispatch]);

  // Optional: You can return something if needed, like loading state or fetched data
  // For example: return { isLoading: true, requirements: data }
};

export default useGetAllRequirement;
