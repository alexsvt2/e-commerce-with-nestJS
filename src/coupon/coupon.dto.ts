import { ApiProperty } from '@nestjs/swagger';

export class CouponDto {
  @ApiProperty()
  couponName: string;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  discount: Number;
  @ApiProperty()
  type: string;
  @ApiProperty()
  orderMin?: Number;
  @ApiProperty()
  expireDate?: Date;
}
