import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";

import { GoogleAuthService } from "./googleAuth.service";
import { TokenDataDto } from "../dto/tokenData.dto";
import { cookieOptions } from "../config/cookieOptions";

@Controller("auth/google")
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async authenticate(@Body() tokenData: TokenDataDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.googleAuthService.authenticate(tokenData.token);
    res.cookie("token", token, cookieOptions);
    return { token };
  }
}
