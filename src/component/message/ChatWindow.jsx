// components/ChatWindow.js
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASEURL from "../../utils/BaseUrl";
import { setMessages } from "../../redux/slice/messageSlice";
import { SendHorizonal } from "lucide-react";
import Messages from "./Messages";
import useGetRTM from "../../hooks/socket/useGetRTM";

const ChatWindow = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user } = useSelector((store) => store.auth);
  const messages = useSelector((store) => store.message?.messages) || [];
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  // Set up real-time message listener
  useGetRTM();

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!textMessage.trim() || !user) return;

    try {
      const res = await axios.post(
        `${BASEURL}/api/v5/send-message/${user.id}`,
        { content: textMessage },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        // Option 1: Dispatch new message immediately (optional, since the socket should also update)
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.error("Message send error:", error);
    }
  };

  

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Chat Header */}
      <div className="p-4 bg-white border-b border-gray-200 flex items-center h-20 flex-shrink-0">
        <div className="relative">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="ml-4">
          <h2 className="font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-sm text-gray-500">Active now</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <Messages messages={messages} userId={user?.id} />
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <form
        onSubmit={sendMessageHandler}
        className="p-4 bg-white border-t border-gray-200 flex-shrink-0"
      >
        <div className="flex items-center space-x-2">
          <input
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && sendMessageHandler(e)
            }
          />
          <button
            type="submit"
            disabled={!textMessage.trim() || !user}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
