const fs = require('fs-extra');
const svmModel = fs.readJsonSync('./src/helper/svm_model.json');
const vectorizer = fs.readJsonSync('./src/helper/tfidf_vectorizer.json');
const vocabulary = vectorizer.vocabulary;
const weights = svmModel.weights;
const intercepts = svmModel.intercept;
const classes = svmModel.classes;

// Fungsi untuk Vectorization
const vectorizeText = (text) => {
  const tokens = text.toLowerCase().split(/\W+/);
  const vector = Array(Object.keys(vocabulary).length).fill(0);

  tokens.forEach(token => {
    if (vocabulary.hasOwnProperty(token)) {
      vector[vocabulary[token]] += 1;
    }
  });

  return vector;
};

// Fungsi untuk Multi-Class Klasifikasi
const classifyText = (vector) => {
  let maxScore = -Infinity;
  let bestClass = null;

  // Iterasi untuk tiap kelas dan hitung skor
  weights.forEach((weightVector, index) => {
    const className = classes[index] || `Class_${index}`;
    const dotProduct = weightVector.reduce((sum, weight, i) => sum + (weight * vector[i]), 0);
    const score = dotProduct + intercepts[index];
    console.log(`Class: ${className}, Score: ${score}`);
    
    if (score > maxScore) {
      maxScore = score;
      bestClass = className;
    }
  });

  return bestClass;
};

exports.klasifikasi = async (text) => {
  // Vectorization
  const vector = vectorizeText(text);

  // Klasifikasi Multi-Class
  const result = classifyText(vector);

  return({ text, result });
};
