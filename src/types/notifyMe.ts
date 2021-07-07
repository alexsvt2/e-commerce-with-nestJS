/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { User } from './user';

export interface notifyMe extends Document {
  user: User;
  product: string;
}
