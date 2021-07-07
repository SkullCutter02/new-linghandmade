import { IsOptional, Length } from "class-validator";

export class UpdateCategoryDto {
  @IsOptional()
  @Length(1, 25)
  name?: string;
}
