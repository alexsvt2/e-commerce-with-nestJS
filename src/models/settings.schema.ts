/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const settingsSchema = new mongoose.Schema({
  vat: { type: Number, default: 0.15 },
  version:{
    android:String,
    ios: String
  }
});
