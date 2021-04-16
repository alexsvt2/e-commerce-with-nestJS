/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class WishlistDto {
  @ApiProperty()
  user: string;
  @ApiProperty()
  products: string[];
}
