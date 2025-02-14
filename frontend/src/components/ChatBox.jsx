import React, { useState } from "react";
import socket from "../socket";

const ChatBox = ({ userId, receiverId, chatHistory }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!receiverId || !message) return;
    socket.emit("privateMessage", { senderId: userId, receiverId, message });
    chatHistory.push({ senderId: userId, message });
    setMessage("");
  };

  return (
    <div>
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black" }}>
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <strong>{chat.senderId === userId ? "You" : chat.senderId}:</strong> {chat.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
