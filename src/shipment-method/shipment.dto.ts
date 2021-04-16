import { ApiProperty } from '@nestjs/swagger';

export class ShipmentDto {
  @ApiProperty()
  shippingType: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  duration: string;
  @ApiProperty()
  price: number;
}
