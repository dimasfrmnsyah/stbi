const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ChatSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    userId: { type: String, ref: "User", required: true }, 
    message: { type: String, required: true }, 
    response: { type: String, required: true }, 
    sequence: { type: Number, required: true },
  },
  { timestamps: true }
);

  
module.exports = mongoose.model("Chat", ChatSchema);
