/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Name } from 'src/types/shared.dto';
import { Description } from 'src/types/shared.dto';
import { Category } from 'src/types/category';
import { Image, variant } from 'src/types/product';

export class CreateProductDTO {
  @ApiProperty()
  productName: Name;
  @ApiProperty()
  serialNumber: string;
  @ApiProperty()
  image: Image[];
  @ApiProperty()
  description: Description;
  @ApiProperty()
  price: number;
  @ApiProperty()
  currency: string;
  @ApiProperty()
  category: string[];
  @ApiProperty()
  variants: variant[];
  @ApiProperty()
  brand: string;
  @ApiProperty()
  fashionModel: string;
  @ApiProperty()
  qty: number;
  @ApiProperty()
  threshold: number;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  order: number;
  @ApiProperty()
  new: boolean;
  @ApiProperty()
  isFeature: boolean;
  @ApiProperty()
  discount: number;
  @ApiProperty()
  thumbnail: Image;
  @ApiProperty()
  video: string;
  @ApiProperty()
  tags: string[];
}

export type UpdateProductDTO = Partial<CreateProductDTO>;

// var user
// var arrayOfProd[{productId , qty, varianceObj }]
// var statusOfcart
