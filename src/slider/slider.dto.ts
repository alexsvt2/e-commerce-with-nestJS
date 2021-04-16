import { ApiProperty } from '@nestjs/swagger';
import { SliderImage } from 'src/types/slider';

export class SliderDto {
  @ApiProperty()
  images: SliderImage[];
}
