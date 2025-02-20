import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRoom } from "../redux/slice/roomSlice";
import axios from "axios";
import BASEURL from "../utils/BaseUrl";

const useGetAllRooms = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const response = await axios.get(`${BASEURL}/api/v2a/all/rooms`, {
          withCredentials: true,
        });


        dispatch(setRoom({ room: response.data?.data || [] })); // Extract rooms from `data`
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    fetchAllRooms();
  }, [dispatch, refresh]); // Add `refresh` as a dependency

  return { refresh: () => setRefresh((prev) => !prev) }; // Return a function to trigger refresh
};

export default useGetAllRooms;