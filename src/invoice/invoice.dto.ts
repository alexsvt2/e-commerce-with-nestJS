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
  isPaid: boolean;
  @ApiProperty()
  withCoupon: boolean;
  @ApiProperty()
  withDiscount: number;
}

export type UpdateInvoiceDTO = Partial<InvoiceDto>;
