/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Image } from './product';

export class SliderImage {
  @ApiProperty()
  path: string;
  @ApiProperty()
  order?: number;
  @ApiProperty()
  key: string;
  @ApiProperty()
  redirect: string;
}

export interface Slider extends Document {
  images: SliderImage[];
}
