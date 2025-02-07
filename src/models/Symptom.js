const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const SymptomSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    userId: { type: String, ref: 'User', required: true },
    chatId: { type: String, ref: 'Chat', required: true },
    symptomText: { type: String, required: true },
    duration: { type: String, required: true }, 
    classifiedDisorder: { type: String }, 
    probability: { type: Number }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Symptom', SymptomSchema);
