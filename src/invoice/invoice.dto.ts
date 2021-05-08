/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDto {
  @ApiProperty()
  totalOfInvoice: number;
  @ApiProperty()
  totalWithTax: number;
  @ApiProperty()
  order: string;
  @ApiProperty()
  user: string;
  @ApiProperty()
  withCoupon: boolean;
  @ApiProperty()
  withDiscount: number;
  @ApiProperty()
  couponName:string;

}

export type UpdateInvoiceDTO = Partial<InvoiceDto>;
