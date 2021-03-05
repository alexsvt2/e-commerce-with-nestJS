/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Category } from './category';
import { Name } from './shared.dto';

export class Image {
  @ApiProperty()
  path: string;
  @ApiProperty()
  order ?: number;
  @ApiProperty()
  key: string
}




export interface product extends Document {
    productName:Name,
    serialNumber :string,
    image: [Image],
    description: string,
    price : number,
    category: 
    [Category]
    ,
    currency:string,
    qty:number,
    threshold:number,
    isActive:boolean,
    isFeature: boolean ,
    discount : number,
    thumbnail:  Image  ,
    video: string
}