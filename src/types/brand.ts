/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { Image } from './product';
import { Name } from './shared.dto';

export interface Brand extends Document {
  brandName: Name;
  order:number;
  image: Image;
}
