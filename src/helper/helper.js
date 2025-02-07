const { Chat } = require("../models");

const getLastSequence = async (userId) => {
  const lastChat = await Chat.findOne({ userId })
    .sort({ sequence: -1 })  
    .select("sequence");  

  
  return lastChat ? lastChat.sequence : 1;
};

module.exports = {
  getLastSequence,
};
