/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      qtyOfProduct: { type: Number },
      variantIdOfProduct: { type:String },
      variant: {
        _id: { type: mongoose.Schema.Types.ObjectId },
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
  createDate: {
    type: Date,
    default: Date.now,
  },
});
