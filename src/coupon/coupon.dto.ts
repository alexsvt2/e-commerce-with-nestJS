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
}
