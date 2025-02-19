const ruleCondition = async (name, classification = null) => {
  let recommendations = {
    "Anxiety": "Cobalah teknik pernapasan dalam, olahraga ringan, dan kurangi konsumsi kafein.",
    "Bipolar": "Pastikan Anda memiliki rutinitas tidur yang teratur dan catat perubahan suasana hati Anda.",
    "Depression": "Cobalah berbicara dengan orang terpercaya dan buat jadwal aktivitas harian untuk tetap produktif.",
    "Normal": "Terus jaga pola hidup sehat dan tetap berpikir positif!",
    "Personality disorder": "Mengenal diri sendiri adalah langkah awal yang baik, pertimbangkan untuk mengikuti terapi jika perlu.",
    "Stress": "Coba latihan relaksasi seperti meditasi atau yoga untuk mengurangi stres.",
    "Suicidal": "Anda tidak sendirian. Segera hubungi orang terpercaya atau layanan profesional untuk mendapatkan bantuan."
  };

  let rule = {
    "rules": [
      {
        "sequence": 1,
        "description": "Validasi biodata & deteksi gejala awal",
        "trigger": "User mengisi biodata",
        "validation": {
          "nama": "wajib diisi",
          "usia": "angka, tidak boleh negatif",
          "gender": "harus L atau P"
        },
        "response": `Terima kasih kak ${name}! Sekarang, mari kita lanjutkan. Silakan ceritakan bagaimana perasaan Anda hari ini.\nApa yang anda rasakan?`,
        "expected_user_input": {
          "keluhan": ["sulit tidur", "cemas", "kehilangan minat", "pikiran negatif"]
        }
      },
      {
        "sequence": 2,
        "description": "Analisis gejala & durasi",
        "trigger": "User memberikan jawaban tentang gejala",
        "response": "Terima kasih telah berbagi. Sejak kapan Anda mengalami ini?",
        "expected_user_input": {
          "durasi": "dalam hitungan hari/minggu/bulan"
        }
      },
      {
        "sequence": 3,
        "description": "Pemberian rekomendasi awal berdasarkan klasifikasi",
        "trigger": "User memberikan informasi durasi gejala",
        "classification": {
          "ringan": "Gejala berlangsung kurang dari 2 minggu",
          "sedang": "Gejala berlangsung antara 2-4 minggu",
          "berat": "Gejala berlangsung lebih dari 1 bulan"
        },
        "response": classification
          ? `Berdasarkan analisis kami, kondisi Anda diklasifikasikan sebagai *${classification}*. ${recommendations[classification]}`
          : "Kami sedang menganalisis kondisi Anda. Mohon tunggu...",
      },
      {
        "sequence": 4,
        "description": "Pencegahan Self-Diagnose",
        "trigger": "User mendapatkan hasil analisis",
        "response": "Penting untuk diketahui bahwa chatbot ini bukan pengganti diagnosis profesional. Jika Anda merasa kondisi Anda mengganggu aktivitas sehari-hari, silakan berkonsultasi dengan tenaga kesehatan."
      }
    ]
  };

  return rule;
};

module.exports = { ruleCondition };
