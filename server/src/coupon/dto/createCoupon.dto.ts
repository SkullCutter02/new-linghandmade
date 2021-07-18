import { IsNumber, Max, Min } from "class-validator";

export class CreateCouponDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;
}
