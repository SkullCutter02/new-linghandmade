import { Injectable } from "@nestjs/common";
import { getTestMessageUrl, SendMailOptions } from "nodemailer";

import { getTransporter } from "./config/transporter";

@Injectable()
export class EmailService {
  async sendResetEmail(email: string, url: string) {
    const mailOptions: SendMailOptions = {
      from: "foo@example.com", // TODO: change email address
      to: email,
      subject: "Reset password",
      text: url,
      html: `<a href="${url}">${url}</a>`,
    };

    const transporter = await getTransporter();

    const info = await transporter.sendMail(mailOptions);

    console.log(getTestMessageUrl(info)); // TODO: remove when using actual smtp service

    return info;
  }
}
