import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Auth, google } from "googleapis";
import { JwtService } from "@nestjs/jwt";
import { NotFoundError } from "@mikro-orm/core";

import { UserRepository } from "../../user/repositories/user.repository";
import { StripeService } from "../../stripe/stripe.service";
import { User } from "../../user/entities/user.entity";

@Injectable()
export class GoogleAuthService {
  oAuthClient: Auth.OAuth2Client;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly stripeService: StripeService,
    private readonly jwtService: JwtService,
  ) {
    this.oAuthClient = new google.auth.OAuth2(
      process.env.GOOGLE_AUTH_CLIENT_ID,
      process.env.GOOGLE_AUTH_CLIENT_SECRET,
    );
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oAuthClient.getTokenInfo(token);
    const email = tokenInfo.email;

    try {
      const user = await this.userRepository.findOneOrFail({ email });
      return this.handleRegisteredUser(user);
    } catch (err) {
      if (err.status !== 404 && !(err instanceof NotFoundError)) throw new Error(err);

      return this.registerUser(token, email);
    }
  }

  async registerUser(token: string, email: string) {
    const name = (await this.getUserData(token)).name;
    const user = await this.createUserWithGoogle(email, name);
    return this.handleRegisteredUser(user);
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2("v2").userinfo;

    this.oAuthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oAuthClient,
    });

    return userInfoResponse.data;
  }

  async createUserWithGoogle(email: string, name: string) {
    const stripeCustomer = await this.stripeService.createCustomer(name, email);

    const user = this.userRepository.create({
      username: name,
      email,
      isRegisteredWithGoogle: true,
      stripeCustomerId: stripeCustomer.id,
    });

    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async handleRegisteredUser(user: User) {
    if (!user.isRegisteredWithGoogle) throw new UnauthorizedException("User with this email already exists");

    return this.jwtService.sign({ id: user.id });
  }
}
