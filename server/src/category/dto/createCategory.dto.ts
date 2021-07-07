import { Length } from "class-validator";

export class CreateCategoryDto {
  @Length(1, 25)
  name: string;
}
