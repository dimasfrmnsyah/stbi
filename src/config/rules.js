const ruleCondition = async (name) => {
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
        "response": `Terima kasih kak ${name}! Sekarang, mari kita lanjutkan. Silakan ceritakan bagaimana perasaan Anda hari ini.\nApakah Anda mengalami:\n1️⃣ Kesulitan tidur?\n2️⃣ Perasaan cemas berlebihan?\n3️⃣ Kehilangan minat dalam aktivitas sehari-hari?\n4️⃣ Pikiran negatif yang terus menerus?`,
        "expected_user_input": {
          "keluhan": ["sulit tidur", "cemas", "kehilangan minat", "pikiran negatif"]
        },
      },
      {
        "sequence": 2,
        "description": "Analisis gejala & durasi",
        "trigger": "User memberikan jawaban tentang gejala",
        "response": "Terima kasih telah berbagi. Sejak kapan Anda mengalami ini?",
        "expected_user_input": {
          "durasi": "dalam hitungan hari/minggu/bulan"
        },
      },
      {
        "sequence": 3,
        "description": "Pemberian rekomendasi awal",
        "trigger": "User memberikan informasi durasi gejala",
        "classification": {
          "ringan": "Gejala berlangsung kurang dari 2 minggu",
          "sedang": "Gejala berlangsung antara 2-4 minggu",
          "berat": "Gejala berlangsung lebih dari 1 bulan"
        },
        "response": "Berdasarkan informasi yang Anda berikan, berikut rekomendasi saya:\n- Jika ringan, cobalah teknik relaksasi seperti meditasi atau olahraga ringan.\n- Jika sedang, cobalah berbicara dengan orang terpercaya atau menulis jurnal.\n- Jika berat, sebaiknya pertimbangkan untuk berkonsultasi dengan profesional.",
      },
      {
        "sequence": 4,
        "description": "Pencegahan Self-Diagnose",
        "trigger": "User mendapatkan hasil analisis",
        "response": "Penting untuk diketahui bahwa chatbot ini bukan pengganti diagnosis profesional. Jika Anda merasa kondisi Anda mengganggu aktivitas sehari-hari, silakan berkonsultasi dengan tenaga kesehatan.",
      }
    ]
  }
  return rule
}
module.exports ={ 
  ruleCondition
}