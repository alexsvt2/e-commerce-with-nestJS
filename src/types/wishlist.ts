/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Wishlist extends Document {
  user: string;
  products: string[];
}
