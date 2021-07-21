import { createTransport } from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import { htmlToText } from "nodemailer-html-to-text";

export const getTransporter = (apiKey: string) => {
  return createTransport(
    nodemailerSendgrid({
      apiKey,
    }),
  ).use("compile", htmlToText());
};
