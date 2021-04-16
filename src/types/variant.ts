/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { Image } from './product';
import { Name } from './shared.dto';

export interface Variant extends Document {
  variantName: Name;
  variantValues: string[];
}
