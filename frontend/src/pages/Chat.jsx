import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import socket from "../socket";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const { userId } = useParams();
  const [receiverId, setReceiverId] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/chats/messages/${userId}/${receiverId}`);
      setChatHistory(response.data.messages);
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  };

  useEffect(() => {
    socket.on("privateMessage", (data) => {
      setChatHistory((prev) => [...prev, { senderId: data.senderId, message: data.message }]);
    });

    return () => socket.off("privateMessage");
  }, []);

  return (
    <div>
      <h2>Welcome, {userId}</h2>
      <input
        type="text"
        placeholder="Enter Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <button onClick={fetchChatHistory}>Fetch Chat</button>
      <ChatBox userId={userId} receiverId={receiverId} chatHistory={chatHistory} />
    </div>
  );
};

export default Chat;
