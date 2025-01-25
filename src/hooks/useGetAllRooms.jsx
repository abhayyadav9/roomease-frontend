import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoom } from "../redux/slice/roomSlice";
import axios from "axios";

const useGetAllRooms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v2a/all/rooms", {
          withCredentials: true
        });

        console.log("API Response:", response.data); // Debugging: Check API response

        dispatch(setRoom({ room: response.data?.data || [] })); // Extract rooms from `data`

      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    fetchAllRooms();
  }, [dispatch]);

};

export default useGetAllRooms;