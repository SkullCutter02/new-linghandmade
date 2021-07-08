import { IsOptional, IsPositive, IsString, IsUrl, IsUUID, Min } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsPositive()
  price: number;

  @IsUrl()
  mainImgUrl: string;

  @IsOptional()
  carouselImgUrls?: string[] = [];

  @Min(0)
  @IsOptional()
  amtLeft?: number = 0;

  @IsOptional()
  featured?: boolean = false;

  @IsOptional()
  remarks?: string;

  @IsUUID()
  categoryId: string;
}
