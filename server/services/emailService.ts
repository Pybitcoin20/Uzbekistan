import nodemailer from 'nodemailer';

// Configure transporter (using a mock/test account for now, but ready for production)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const url = `${process.env.APP_URL || 'http://localhost:3000'}/api/auth/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: '"Uzbekistan Heritage" <no-reply@uzheritage.uz>',
    to: email,
    subject: 'Email manzilingizni tasdiqlang',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Xush kelibsiz!</h2>
        <p>Uzbekistan Heritage platformasida ro'yxatdan o'tganingiz uchun rahmat.</p>
        <p>Emailingizni tasdiqlash uchun quyidagi tugmani bosing:</p>
        <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #0047AB; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Tasdiqlash</a>
        <p>Agar bu so'rovni siz yubormagan bo'lsangiz, ushbu xatga e'tibor bermang.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const url = `${process.env.APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
  
  await transporter.sendMail({
    from: '"Uzbekistan Heritage" <no-reply@uzheritage.uz>',
    to: email,
    subject: 'Parolni tiklash',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Parolni tiklash so'rovi</h2>
        <p>Sizning hisobingiz uchun parolni tiklash so'rovi yuborildi.</p>
        <p>Parolni o'zgartirish uchun quyidagi tugmani bosing (havola 15 daqiqa davomida amal qiladi):</p>
        <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #0047AB; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Parolni tiklash</a>
        <p>Agar siz parolni tiklashni so'ramagan bo'lsangiz, ushbu xatga e'tibor bermang.</p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(email: string, displayName: string) {
  await transporter.sendMail({
    from: '"Uzbekistan Heritage" <no-reply@uzheritage.uz>',
    to: email,
    subject: 'Xush kelibsiz, ' + displayName + '!',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(to right, #0047AB, #002D62); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">Uzbekistan Heritage</h1>
        </div>
        <div style="padding: 40px;">
          <h2>Assalomu alaykum, ${displayName}!</h2>
          <p>Sizni O'zbekistonning boy madaniy merosi va zamonaviy sayohat ekotizimida ko'rib turganimizdan juda mamnunmiz.</p>
          <p>Siz endi quyidagi imkoniyatlardan foydalanishingiz mumkin:</p>
          <ul>
            <li>AI orqali aqlli sayohat rejalarini tuzish</li>
            <li>Jonli Plov Radaridan foydalanish</li>
            <li>Tarixiy obidalarni xaritada o'rganish</li>
          </ul>
          <p>Sayohatni hoziroq boshlang!</p>
          <a href="${process.env.APP_URL}" style="display: inline-block; padding: 12px 24px; background-color: #0047AB; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Platformaga o'tish</a>
        </div>
      </div>
    `,
  });
}
