/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Coupon extends Document {
  couponName: string;
  status: boolean;
  discount: Number;
  type: string;
  orderMin?: Number, 
  expireDate?: Date,
}
