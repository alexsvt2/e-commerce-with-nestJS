/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const variantSchema = new mongoose.Schema({
  variantName: {
    //size
    ar: { type: String, requierd: true },
    en: { type: String, requierd: true },
  },
  variantValues: [String], // [xl . l . ]
  type: String, // color or text
  createDate: {
    type: Date,
    default: Date.now,
  },
});
