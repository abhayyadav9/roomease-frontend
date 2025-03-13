import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BASEURL from "../../../utils/BaseUrl";
import { setMessages } from "../../../redux/slice/messageSlice";
import { setSelectedUser } from "../../../redux/slice/authSlice";
import Messages from "../../message/Messages";
import { Input } from "../../../components/ui/input";
import { SendHorizonal } from "lucide-react"; // Import an icon for send button

const AdminMessage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user, selectedUser } = useSelector((store) => store.auth);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();




  
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!textMessage.trim()) return;
    
    try {
      const res = await axios.post(
        `${BASEURL}/api/v5//send-message/${selectedUser?.user?._id}`,
        { content:textMessage },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data?.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]);

  return (
    <div className="flex h-full bg-gray-100">
      {selectedUser ? (
        <section className="flex flex-col flex-1 bg-white shadow-lg rounded-lg overflow-hidden m-4">
          {/* Chat Header */}
          <div className="flex items-center  border-b border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="relative">
              <img
                src={selectedUser?.ownerPic || selectedUser?.tenantPic}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-4">
              <h2 className="font-semibold text-gray-800">{selectedUser?.name}</h2>
              <p className="text-sm text-gray-500">Active now</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 min-h-0"> {/* Crucial fix for flex overflow */}

            <Messages messages={messages} userId={selectedUser?.user?._id} />
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessageHandler} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <Input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full px-6 py-4 border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && sendMessageHandler(e)}
              />
              <button
                type="submit"
                disabled={!textMessage.trim()}
                className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SendHorizonal className="w-5 h-5" />
              </button>
            </div>
          </form>
        </section>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-gray-400">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium">Select a conversation</h2>
          <p className="text-sm">Choose a user to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default AdminMessage;