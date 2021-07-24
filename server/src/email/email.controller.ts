import { Body, Controller, Post } from "@nestjs/common";
import { SendContactUsEmailDto } from "./dto/sendContactUsEmail.dto";

import { EmailService } from "./email.service";

@Controller("email")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post("/contact-us")
  async sendContactUsEmail(@Body() { name, email, subject, message }: SendContactUsEmailDto) {
    const html = this.emailService.compileHTML<Omit<SendContactUsEmailDto, "subject" | "email">>(
      "contact-us.html",
      { name, message },
    );
    return await this.emailService.send(subject, "lhmsoap2018@gmail.com", html, email);
  }
}
