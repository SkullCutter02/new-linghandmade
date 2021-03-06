import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { v4 as uuid } from "uuid";

import { SignupDto } from "./dto/signup.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";
import { User } from "../user/entities/user.entity";
import { addMillisecondsToNow } from "../utils/addMillisecondsToNow";
import { Message } from "../types/Message";
import { EmailService } from "../email/email.service";
import { StripeService } from "../stripe/stripe.service";
import { UserRepository } from "../user/repositories/user.repository";
import { ResetEmailRepository } from "./repositories/resetEmail.repository";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly resetEmailRepository: ResetEmailRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly stripeService: StripeService,
    private readonly userService: UserService,
  ) {}

  async signup({ username, email, password }: SignupDto): Promise<string> {
    const isExist = await this.userRepository.isExist(username, email);

    if (!isExist) {
      const hash = await argon2.hash(password);

      const user = await this.userService.create(username, email, hash);

      return this.jwtService.sign({ id: user.id });
    }
  }

  async login(user: User): Promise<string> {
    return this.jwtService.sign({ id: user.id });
  }

  adminLogin(username: string, password: string): string {
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD)
      return this.jwtService.sign({ username });

    throw new UnauthorizedException("Invalid credentials");
  }

  async forgotPassword(email: string): Promise<Message> {
    const user = await this.userRepository.findOne({ email });

    if (!user) throw new NotFoundException("User with this email not found");

    const token = uuid();

    const resetEmail = await this.resetEmailRepository.create({
      userId: user.id,
      token,
      expirationDate: addMillisecondsToNow(3_600_000), // 1 hour expiration
    });

    const url = `${process.env.FRONTEND_URL}/auth/reset-password/${token}`;
    const html = this.emailService.compileHTML<{ url: string }>("reset-email.html", { url });

    await this.emailService.send("Reset password email for Ling Handmade", user.email, html);
    await this.resetEmailRepository.persistAndFlush(resetEmail);

    return { message: "Email sent" };
  }

  async resetPassword({ token, password }: ResetPasswordDto): Promise<Message> {
    const email = await this.resetEmailRepository.findOne({ token });

    if (!email) throw new NotFoundException("Email token not found");

    if (new Date(Date.now()) > email.expirationDate) {
      await this.resetEmailRepository.removeAndFlush(email);
      throw new InternalServerErrorException("Reset email expiration date reached");
    }

    const user = await this.userRepository.findOne(email.userId);

    if (!user) throw new NotFoundException("User not found");

    user.assign({ hash: await argon2.hash(password) });

    await this.userRepository.persistAndFlush(user);
    await this.resetEmailRepository.removeAndFlush(email);

    return { message: "Password reset" };
  }

  me(user: User): User {
    return user;
  }
}
