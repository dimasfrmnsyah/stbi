const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const RecommendationSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    classifiedDisorder: { type: String, required: true },
    recommendationText: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recommendation', RecommendationSchema);
