/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { Order } from './order';
import { User } from './user';

export interface Invoice extends Document {
  totalOfInvoice: number;
  totalWithTax: number;
  withCoupon: boolean;
  couponName:string;
  withDiscount: number;
  order: Order;
  sequenceId: string;
  createDate: Date;
  user: User;
}
