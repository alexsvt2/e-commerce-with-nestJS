/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Shipment extends Document {
  shippingType: string;
  city: string;
  duration: string;
  price: number;
}
