import { IsOptional, IsString, IsUrl, IsUUID, Min } from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsUrl()
  mainImgUrl?: string;

  @IsOptional()
  carouselImgUrls?: string[] = [];

  @Min(0)
  @IsOptional()
  amtLeft?: number = 0;

  @IsOptional()
  featured?: boolean = false;

  @IsOptional()
  remarks?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
