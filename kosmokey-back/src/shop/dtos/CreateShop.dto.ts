import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  MaxLength,
} from 'class-validator';
import { Product } from 'src/utils/typeorm';

export class CreateShopDto {
  @IsNotEmpty()
  brandName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  logo: string;

  @IsNotEmpty()
  @IsNumberString()
  siren: number;

  @IsNotEmpty()
  postalAddress: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @MaxLength(5)
  @IsNumberString()
  zip: string;

  @IsNotEmpty()
  country: string;
  products: Product[];
}
