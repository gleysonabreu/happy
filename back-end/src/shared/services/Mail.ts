import nodemailer from 'nodemailer';
import process from 'process';

interface IMail {
  to: string;
  subject: string;
  message: string;
}

export const sendMail = async (mail: IMail) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'gleyson_datu@hotmail.com',
    to: mail.to,
    subject: mail.subject,
    text: mail.message,
  };

  await transport.sendMail(mailOptions);
};
