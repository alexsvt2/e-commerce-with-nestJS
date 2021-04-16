/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const invoiceSchema = new mongoose.Schema({
  totalOfInvoice: { type: Number },
  totalWithTax: { type: Number },
  isPaid: { type: Boolean, default: false },
  withCoupon: { type: Boolean, default: false },
  withDiscount: { type: Number },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Orders' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createDate: {
    type: Date,
    default: Date.now,
  },
});
