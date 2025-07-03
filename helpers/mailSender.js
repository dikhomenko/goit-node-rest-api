import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const config = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);
const BASE_URL = process.env.BASE_URL;


async function sendVerificationEmail(email, verificationToken) {
  const verifyLink = `${BASE_URL}/api/auth/verify/${verificationToken}`;
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Verify your email on 'dina-nodejs-rest-api'",
    html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`,
  });
}

export default { sendVerificationEmail };
