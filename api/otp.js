export default async function handler(req, res) {
  const API_KEY = "cd2dc704Be3cdd39f872fB5e567ec38e";
  const ID = req.query.id;

  if (!ID) {
    return res.status(200).json({ otp: "Masukkan ID dulu" });
  }

  try {
    const response = await fetch(
      `https://hero-sms.com/api/v1/sms/check?api_key=${API_KEY}&id=${ID}`
    );

    const data = await response.json();

    let raw = "";

    if (data.sms) {
      raw = data.sms;
    } else if (data.code) {
      raw = data.code;
    } else if (data.message) {
      raw = data.message;
    } else {
      raw = JSON.stringify(data);
    }

    // 🔥 AMBIL ANGKA SAJA (OTP)
    let otpMatch = raw.match(/\d{4,8}/); // ambil angka 4-8 digit
    let otp = otpMatch ? otpMatch[0] : "Menunggu OTP";

    res.status(200).json({ otp });

  } catch (error) {
    res.status(500).json({ otp: "Error ambil OTP" });
  }
}
