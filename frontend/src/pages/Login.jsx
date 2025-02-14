import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import socket from "../socket";

const Login = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { userId });
      if (response.data.success) {
        socket.emit("joinRoom", userId); // Join room on the server
        navigate(`/chat/${userId}`); // Redirect to chat page
      } else {
        alert("Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
