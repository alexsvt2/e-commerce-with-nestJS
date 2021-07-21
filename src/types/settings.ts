/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export class Version {
  android:string;
  ios:string
}

export interface Settings extends Document {
  vat: number;
  cod:number;
  giftPrice:number;
  version:Version;
}
