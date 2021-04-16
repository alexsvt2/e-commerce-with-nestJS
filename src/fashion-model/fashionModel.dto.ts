import { ApiProperty } from '@nestjs/swagger';

export class fashionModelDto {
  @ApiProperty()
  modelName: string;
  @ApiProperty()
  modelWear: string;
  @ApiProperty()
  height: string;
  @ApiProperty()
  bust: string;
  @ApiProperty()
  waist: string;
  @ApiProperty()
  hips: string;
}
