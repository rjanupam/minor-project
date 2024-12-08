import nodemailer from "nodemailer";

const sendEmail = async (email, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: body,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
