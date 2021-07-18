import { IsNumber, Max, Min } from "class-validator";

export class UpdateCouponDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;
}
