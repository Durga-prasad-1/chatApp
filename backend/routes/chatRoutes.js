const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Fetch chat history between two users
router.get("/messages/:senderId/:receiverId", async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 }); // Sort by oldest first
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
});

module.exports = router;
