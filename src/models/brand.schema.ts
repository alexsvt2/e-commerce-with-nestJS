/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const brandSchema = new mongoose.Schema({
  brandName: {
    ar: { type: String, requierd: true },
    en: { type: String, requierd: true },
  },
  order:Number,
  image: {
    path: { type: String, requierd: true },
    key: { type: String },
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});
