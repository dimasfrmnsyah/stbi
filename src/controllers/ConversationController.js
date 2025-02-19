const axios = require("axios");
const FormData = require("form-data");
const { User, Chat } = require("../models");
const { getLastSequence, findResponseBySequence } = require("../helper/helper");
const { klasifikasi } = require("../helper/klasifikasi");
// Fungsi untuk Handle Biodata
exports.start = async (req, res) => {
  const { message } = req.body;

  try {
    const [nama, age, genderTemp] = message.split(/\s*-\s*/);
    let gender = genderTemp.toUpperCase();
    if (!nama || !age || !gender) {
      return res.status(400).json({
        success: false,
        message: "Semua field (nama, age, gender) wajib diisi.",
      });
    }
    // Simpan User
    const user = new User({ name: nama, age, gender });
    await user.save();

    // Cari Sequence dan Response
    const lastSequence = await getLastSequence(user._id);
    const response = await findResponseBySequence(lastSequence, nama);

    // Simpan Chat
    const chat = new Chat({
      userId: user._id,
      message: `Nama: ${nama}, Umur: ${age}, Gender: ${gender}`,
      response: response,
      sequence: lastSequence,
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

exports.proses = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const user = await User.findOne({ _id: id });
    let lastSequence = await getLastSequence(user._id);

    if (lastSequence == 1) {
      // Sequence 2: Klasifikasi awal dari keluhan
      const klasi = await klasifikasi(message);
      lastSequence++;
      const response = await findResponseBySequence(lastSequence, user.name);

      const chat = new Chat({
        userId: user._id,
        message: `Keluhan: ${message} - Klasifikasi: ${klasi.result}`,
        response,
        sequence: lastSequence,
      });
      await chat.save();

      return res.status(200).json({
        success: true,
        response,
        lastSequence,
        isEnd: false,
        chat
      });
    } else if (lastSequence == 2) {
      // Sequence 3: Gabungkan dengan durasi & klasifikasi ulang
      const findChat = await Chat.findOne({ userId: id, sequence: 2 });
      let lastMessage = findChat.message.split(" - ")[0];  
      const combinedText = `${lastMessage} selama ${message}`;
      const klasi = await klasifikasi(combinedText);
      lastSequence++;

      const response = await findResponseBySequence(lastSequence, user.name, klasi.result);
      const chat = new Chat({
        userId: user._id,
        message: `${combinedText} - Klasifikasi Akhir: ${klasi.result}`,
        response,
        sequence: lastSequence,
      });
      await chat.save();

      return res.status(200).json({
        success: true,
        response,
        lastSequence,
        isEnd: true,
        chat
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memproses data.",
      error: err.message,
    });
  }
};
