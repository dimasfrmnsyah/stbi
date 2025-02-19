const { Chat } = require("../models");
const { ruleCondition } = require("../config/rules");

const getLastSequence = async (userId) => {
  const lastChat = await Chat.findOne({ userId })
    .sort({ sequence: -1 })  
    .select("sequence");  

  return lastChat ? lastChat.sequence : 1;
};

const findResponseBySequence = async (sequence, name, classification = null) => {
  const getRules = await ruleCondition(name, classification);
  const findBySequence = getRules.rules.find(seq => seq.sequence === sequence)?.response;
  return findBySequence || "Maaf, saya tidak memahami pertanyaan Anda.";
};

module.exports = {
  getLastSequence,
  findResponseBySequence
};
