/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { cartProduct } from '../types/cart';

export class CartDTO {
  @ApiProperty()
  user: string;
  @ApiProperty()
  products: cartProduct[];
}
