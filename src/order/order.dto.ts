/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { cartProduct } from 'src/types/cart';
import { Address } from 'src/types/user';

export class OrderDto {
  @ApiProperty()
  user: string;
  @ApiProperty()
  address: Address;
  @ApiProperty()
  invoice: string;
  @ApiProperty()
  paymentMethod: string;
  @ApiProperty()
  shippingMethod: string;
  @ApiProperty()
  status: string;
  updateStatusDate:date;
  @ApiProperty()
  products: cartProduct[];
}

export type UpdateOrderDTO = Partial<OrderDto>;
