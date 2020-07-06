import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: `${process.env.SERVICE}`,
  auth: {
    user: `${process.env.EMAIL_USER}`,
    pass: `${process.env.EMAIL_PASS}`,
  },
});

export const sendMail = async (info: {
  email: string;
  username: string;
  code: string;
}) => {
  const mailOptions = {
    from: `${process.env.EMAIL_USER}`, // sender address
    to: `${info.email}`, // list of receivers
    subject: "Verify your account", // Subject line
    html: `<h1 style="">Hello ${info.username}</h1>
        <hr>
        <br>
        <h2>Please verify your account by entering this code in the box after you sign in<h2>
        <hr>
        <br>
        <h2><b>${info.code}</b><h2>
        <hr>
        <br>
        <p> please enter the code otherwise you won't be able to sign in and your account will be deleted
        `, // plain text body
  };
  try {
    const emailVerification = await transporter.sendMail(mailOptions);
    return {
      success: true,
      msg: emailVerification,
    };
  } catch (e) {
    return {
      success: false,
      msg: e.message,
    };
  }
};
