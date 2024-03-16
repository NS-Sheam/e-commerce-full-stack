import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (
  clientUrl: string,
  email: string,
  heading: string,
  buttonText: string,
  message: string,
) => {
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
    subject: heading, // Subject line
    text: "", // plain text body
    html: `<p>${message}</p><a href="${clientUrl}">${buttonText}</a>`, // html body
  });
};
