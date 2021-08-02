import { IsNumber, IsPositive, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class PaginationDto {
  @IsString()
  filter: string;

  @Transform((page) => parseInt(page.value), { toClassOnly: true })
  @IsNumber()
  @IsPositive()
  page: number;

  @Transform((limit) => parseInt(limit.value), { toClassOnly: true })
  @IsNumber()
  @IsPositive()
  limit: number;
}
