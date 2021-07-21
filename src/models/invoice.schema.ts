/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const invoiceSchema = new mongoose.Schema({
  totalOfInvoice: { type: Number },
  totalWithTax: { type: Number },
  withCoupon: { type: Boolean, default: false },
  couponName: { type: String },
  withDiscount: { type: Number },
  isGift: {type:Boolean, default: false},
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Orders' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sequenceId : String,
  createDate: {
    type: Date,
    default: Date.now,
  },
});
