import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import BASEURL from "../../utils/BaseUrl";
import { setMessages } from "../../redux/slice/messageSlice";

const useGetAllMessage = (userid) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchAllMessage = async () => {
      try {
        if (!userid) {
          dispatch(setMessages([]));
          return;
        }

        const res = await axios.get(
          `${BASEURL}/api/v5/all-messages/${userid}`, 
          {
            withCredentials: true,
            signal: controller.signal
          }
        );

        if (res.data.success) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching messages:", error);
          dispatch(setMessages([]));
        }
      }
    };

    fetchAllMessage();

    return () => {
      controller.abort();
      dispatch(setMessages([]));
    };
  }, [userid, dispatch]);
};

export default useGetAllMessage;