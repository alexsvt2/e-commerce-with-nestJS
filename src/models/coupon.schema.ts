/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const couponSchema = new mongoose.Schema({
  couponName: String,
  status: { type: Boolean, default: true },
  discount: Number,
  type: String,
  createDate: {
    type: Date,
    default: Date.now,
  },
});
