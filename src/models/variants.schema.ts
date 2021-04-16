/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const variantSchema = new mongoose.Schema({
  variantName: {
    ar: { type: String, requierd: true },
    en: { type: String, requierd: true },
  },
  variantValues: [String],
  createDate: {
    type: Date,
    default: Date.now,
  },
});
