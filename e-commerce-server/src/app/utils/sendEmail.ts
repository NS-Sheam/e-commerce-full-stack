import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (resetUrlLink: string, email: string) => {
  const transporter = nodemailer.createTransport({
    host: config.email_host,
    port: Number(config.email_port),
    secure: config.NODE_ENV === "production", // `true` for port 465, `false` for all other ports
    auth: {
      user: config.email_user,
      pass: config.email_password,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: config.email_from, // sender address
    to: email, // list of receivers
    subject: "Change your password within 10 minutes!", // Subject line
    text: "", // plain text body
    html: `<p>Change your password within 10 minutes! Click the link below to reset your password:</p><a href="${resetUrlLink}">Reset Password</a>`, // html body
  });
};
