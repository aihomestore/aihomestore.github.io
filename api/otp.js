export default async function handler(req, res) {
  const API_KEY = "ISI_API_KEY_KAMU";
  const ID = "ISI_ID_NUMBER_KAMU";

  try {
    const response = await fetch(
      `https://hero-sms.com/api/v1/sms/check?api_key=${API_KEY}&id=${ID}`
    );

    const data = await response.json();

    // 🔥 Ambil OTP dari berbagai kemungkinan format
    let otp = "";

    if (data.sms) {
      otp = data.sms;
    } else if (data.code) {
      otp = data.code;
    } else if (data.message) {
      otp = data.message;
    } else {
      otp = JSON.stringify(data); // fallback biar kelihatan isinya
    }

    res.status(200).json({ otp });

  } catch (error) {
    res.status(500).json({ otp: "Gagal ambil OTP" });
  }
}
