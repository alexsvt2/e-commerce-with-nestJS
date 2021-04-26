/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const orderSchema = new mongoose.Schema({
  address: {
    addr1: String,
    neighborhood: String,
    city: String,
    description: String,
    country: String,
  },
  invocie: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoices' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      qtyOfProduct: { type: Number },
      variantIdOfProduct: { String },
      variant: {
        variants: [
          {
            variantName: {
              ar: { type: String },
              en: { type: String },
            },
            variantValue: String,
          },
        ],
      },
    },
  ],

  paymentMethod: { type: String, default: 'Credit-Card' },
  status: { type: String, default: ' pending' },
  createDate: {
    type: Date,
    default: Date.now,
  },
});
