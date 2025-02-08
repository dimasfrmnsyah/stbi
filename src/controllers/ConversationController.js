const axios = require("axios");
const FormData = require("form-data");
const { User ,Chat} = require("../models"); 
const {getLastSequence,findResponseBySequence} = require("../helper/helper");

exports.start = async (req, res) => {
  const { message } = req.body; 

  try {
    const [nama, age, gender] = message.split(/\s*-\s*/);

    if (!nama || !age || !gender) {
      return res.status(400).json({
        success: false,
        message: "Semua field (nama, age, gender) wajib diisi.",
      });
    }
    const user = new User({ name: nama, age, gender });
    await user.save();
    const lastSequence = await getLastSequence(user._id);
    const response = await findResponseBySequence(lastSequence,nama)
    const chat = new Chat({
      userId: user._id,
      message: `Nama: ${nama}, Umur: ${age}, Gender: ${gender}`,
      response: response,
      sequence: lastSequence
    });

    await chat.save();
    return res.status(200).json({
      success: true,
      message: "Biodata berhasil disimpan.",
      chat,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menyimpan data.",
      error: err.message,
    });
  }
};
