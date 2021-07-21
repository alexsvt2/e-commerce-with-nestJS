/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/types/order';

export class InvoiceDto {
  @ApiProperty()
  totalOfInvoice: number;
  @ApiProperty()
  totalWithTax: number;
  @ApiProperty()
  order: Order;
  @ApiProperty()
  user: string;
  @ApiProperty()
  withCoupon: boolean;
  @ApiProperty()
  withDiscount: number;
  isGift: boolean;
  @ApiProperty()
  couponName:string;
  sequenceId: string;

}

export type UpdateInvoiceDTO = Partial<InvoiceDto>;
