/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class NotifyMeDto {
  @ApiProperty()
  user: string;
  @ApiProperty()
  product: string;
}
