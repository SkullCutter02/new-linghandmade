import { Injectable } from "@nestjs/common";
import { SendMailOptions } from "nodemailer";

import { getTransporter } from "./config/transporter";

@Injectable()
export class EmailService {
  async sendResetEmail(email: string, url: string) {
    const mailOptions: SendMailOptions = {
      from: "lhmsoap2018@gmail.com",
      to: email,
      subject: "Reset password for ling-handmade.com",
      text: url,
      html: `<a href="${url}">${url}</a>`,
    };

    const transporter = await getTransporter();

    return await transporter.sendMail(mailOptions);
  }
}
