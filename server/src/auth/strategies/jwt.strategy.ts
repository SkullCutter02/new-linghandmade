import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

import { JwtPayload } from "../../shared/types/JwtPayload";
import { User } from "../../user/entities/user.entity";
import { UserRepository } from "../../user/repositories/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (!req || !req.cookies) return null;

          return req.cookies["token"];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ id }: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) throw new UnauthorizedException("User not found");

    return user;
  }
}
