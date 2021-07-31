import { IsNotEmpty, IsString } from "class-validator";

export class TokenDataDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
