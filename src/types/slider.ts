/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Image } from './product';



export interface Slider extends Document {
 
  path: string;
  order?: number;
  key: string;
  redirect: string;
  type: string;
}
