export default async function handler(req, res) {
  const API_KEY = "cd2dc704Be3cdd39f872fB5e567ec38e";

  try {
    // 🔹 1. Ambil order terbaru (ID)
    const orderRes = await fetch(
      `https://hero-sms.com/api/v1/order/list?api_key=${API_KEY}`
    );

    const orderData = await orderRes.json();

    // Ambil ID terakhir
    let lastOrder = orderData?.data?.[0];
    let ID = lastOrder?.id;

    if (!ID) {
      return res.status(200).json({ otp: "Belum ada order" });
    }

    // 🔹 2. Ambil OTP dari ID itu
    const smsRes = await fetch(
      `https://hero-sms.com/api/v1/sms/check?api_key=${API_KEY}&id=${ID}`
    );

    const smsData = await smsRes.json();

    let otp = "";

    if (smsData.sms) {
      otp = smsData.sms;
    } else if (smsData.code) {
      otp = smsData.code;
    } else if (smsData.message) {
      otp = smsData.message;
    } else {
      otp = JSON.stringify(smsData);
    }

    res.status(200).json({
      id: ID,
      otp: otp
    });

  } catch (error) {
    res.status(500).json({ otp: "Error ambil data" });
  }
}
