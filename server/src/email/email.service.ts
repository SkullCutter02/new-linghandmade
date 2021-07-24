import { Injectable } from "@nestjs/common";
import { SendMailOptions } from "nodemailer";
import juice from "juice";
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";

import { getTransporter } from "./config/transporter";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

@Injectable()
export class EmailService {
  transporter: Mail<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = getTransporter(process.env.SENDGRID_API_KEY);
  }

  compileHTML<T = {}>(file: string, variables: T) {
    const source = fs.readFileSync(path.join(__dirname, "templates", file), "utf-8").toString();
    const template = handlebars.compile(source);
    const html = template(variables);
    return juice(html);
  }

  async send(subject: string, to: string, html: string, from: string = "lhmsoap2018@gmail.com") {
    const mailOptions: SendMailOptions = {
      from,
      to,
      subject,
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
