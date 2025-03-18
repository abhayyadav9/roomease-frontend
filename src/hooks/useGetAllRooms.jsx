import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setRoom } from "../redux/slice/roomSlice";
import axios from "axios";
import BASEURL from "../utils/BaseUrl";

const useGetAllRooms = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  // Callback to fetch room data immediately
  const fetchAllRooms = useCallback(async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/v2a/all/rooms`, {
        withCredentials: true,
      });
      dispatch(setRoom({ room: response.data?.data || [] }));
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    }
  }, [dispatch]);

  // Use effect that refetches rooms when 'refresh' changes
  useEffect(() => {
    fetchAllRooms();
  }, [fetchAllRooms, refresh]);

  // Trigger refresh immediately by toggling state
  const triggerRefresh = () => {
    setRefresh(prev => !prev);
  };

  return { refresh: triggerRefresh, fetchRooms: fetchAllRooms };
};

export default useGetAllRooms;
