const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: '12h' }, // TTL index for automatic deletion
  },
},
{
  timestamps: false, // Use only createdAt for TTL, not updatedAt
});

module.exports = mongoose.model("Message", messageSchema);





