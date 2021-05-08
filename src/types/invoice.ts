/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Invoice extends Document {
  totalOfInvoice: number;
  totalWithTax: number;
  withCoupon: boolean;
  couponName:string;
  withDiscount: number;
  order: string;
  user: string;
}
