/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Settings extends Document {
  vat: number;
}
