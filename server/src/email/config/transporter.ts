import { createTransport } from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

export const getTransporter = () => {
  return createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
  );
};
