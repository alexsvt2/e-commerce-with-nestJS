/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Name } from 'src/types/shared.dto';

export class VariantDTO {
  @ApiProperty()
  variantName: Name;
  @ApiProperty()
  variantValues: string[];
  @ApiProperty()
  type: string;
}
