/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Category } from './category';
import { Name } from './shared.dto';
import { Description } from './shared.dto';
import { Variant } from './variant';
export class Image {
  @ApiProperty()
  path: string;
  @ApiProperty()
  order?: number;
  @ApiProperty()
  key: string;
  @ApiProperty()
  prodColor: string;
}

export class variant {
  _id:string;
  @ApiProperty()
  variantId: string;
  @ApiProperty()
  variantValue: string;
  @ApiProperty()
  qty: number;
}

export interface product extends Document {
  productName: Name;
  serialNumber: string;
  image: Image[];
  description: Description;
  price: number;
  category: string[];
  brand: string;
  fashionModel: string;
  variants: variant[];
  currency: string;
  qty: number;
  threshold: number;
  isActive: boolean;
  isFeature: boolean;
  discount: number;
  thumbnail: Image;
  video: string;
  tags: string[];
}
