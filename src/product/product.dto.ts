/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Name } from 'src/types/shared.dto';

import { Category } from 'src/types/category';
import { Image } from 'src/types/product';

export class CreateProductDTO {
    @ApiProperty()
    productName:Name;
    @ApiProperty()
    serialNumber :string;
    @ApiProperty()
    image: [Image];
    @ApiProperty()
    description: string;
    @ApiProperty()
    price : number;
    @ApiProperty()
    currency:string;
    @ApiProperty()
    category:[Category];
    @ApiProperty()
    qty:number;
    @ApiProperty()
    threshold:number;
    @ApiProperty()
    isActive:boolean;
    @ApiProperty()
    isFeature: boolean ;
    @ApiProperty()
    discount : number;
    @ApiProperty()
    thumbnail:  Image  ;
    @ApiProperty()
    video: string;
  }
  
  export type UpdateProductDTO = Partial<CreateProductDTO>;