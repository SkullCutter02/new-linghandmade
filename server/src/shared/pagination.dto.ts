import { IsNumber, IsPositive, IsString } from "class-validator";

export class PaginationDto {
  @IsString()
  filter: string;

  @IsNumber()
  @IsPositive()
  page: number;

  @IsNumber()
  @IsPositive()
  limit: number;
}
