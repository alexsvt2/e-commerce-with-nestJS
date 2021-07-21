/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { cartProduct } from './cart';
import { Address } from './user';

export interface Order extends Document {
  user: string;
  address: Address;
  invoice: string;
  paymentMethod: string;
  isGift: boolean;
  status: string;
  shippingMethod: string;
  updateStatusDate:Date;
  products: cartProduct[];
}
