import { ApiProperty } from '@nestjs/swagger';

export class SliderDto {
  @ApiProperty()
  path: string;
  @ApiProperty()
  order?: number;
  @ApiProperty()
  key: string;
  @ApiProperty()
  redirect: string;
  @ApiProperty()
  type: string;
}
