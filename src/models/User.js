const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ['L', 'P'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
