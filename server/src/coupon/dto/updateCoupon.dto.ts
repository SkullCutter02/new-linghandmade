import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateCouponDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @IsString()
  @IsOptional()
  remarks?: string;
}
