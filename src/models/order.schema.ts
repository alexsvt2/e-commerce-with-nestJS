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
  invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoices' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      qtyOfProduct: { type: Number },
      orginalProduct: { type: Object },
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
  shippingMethod: {  type: mongoose.Schema.Types.ObjectId, ref: 'ShippingMethods'},
  status: { type: String, default: ' Pending' },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateStatusDate: {
    type: Date
  },
});
