/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const shippingSchema = new mongoose.Schema({
  shippingType: String,
  city: String,
  duration: String,
  price: Number,
  createDate: {
    type: Date,
    default: Date.now,
  },
});
