import nodemailer from 'nodemailer';
import process from 'process';

interface IMail {
  to: string;
  subject: string;
  message: string;
}

export const sendMail = async (mail: IMail) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'b7091194647545',
      pass: '1aacb46d1cfecf',
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
