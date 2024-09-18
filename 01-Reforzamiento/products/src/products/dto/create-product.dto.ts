import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Type(() => Number)
  price: number;
}
