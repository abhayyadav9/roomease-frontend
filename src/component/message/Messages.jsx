import React, { useEffect, useRef } from "react";
import { format } from "date-fns";
import useGetAllMessage from "../../hooks/socket/useGetAllMessage";
import useGetRTM from "../../hooks/socket/useGetRTM";

const Messages = ({ messages = [], userId }) => {
  const messagesEndRef = useRef(null);
  useGetAllMessage(userId);
  useGetRTM();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-100">
        {messages.length > 0 ? (
          messages.map((msg) => {
            const isSender = msg.sender === userId;
            const messageDate = new Date(msg.createdAt);
            return (
              <div
                key={msg._id}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative p-2 max-w-md break-words shadow-md rounded-lg transition-all duration-200 ${
                    isSender
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-300"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-base">{msg.content}</p>
                  <div
                    className={`text-xs mt-1 text-right ${
                      isSender ? "text-blue-200" : "text-gray-500"
                    }`}
                  >
                    {format(messageDate, "HH:mm")}
                  </div>
                  {isSender && (
                    <span className="absolute bottom-1 right-2 text-xs">
                      {msg.status === "sent" && "✓"}
                      {msg.status === "delivered" && "✓✓"}
                      {msg.status === "read" && (
                        <span className="text-blue-200">✓✓</span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 mb-4 text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No messages yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Start the conversation by sending a message.
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Messages;
