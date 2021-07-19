import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChargeDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  couponId?: string;
}
