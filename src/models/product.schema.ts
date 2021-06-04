/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const productSchema = new mongoose.Schema({
  productName: {
    ar: { type: String, requierd: true },
    en: { type: String, requierd: true },
  },
  serialNumber: { type: String },
  image: [
    {
      path: { type: String, requierd: true },
      order: { type: Number },
      key: { type: String },
      prodColor: { type: String },
    },
  ],
  description: {
    ar: { type: String, requierd: true },
    en: { type: String, requierd: true },
  },
  price: { type: Number, requierd: true },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  fashionModel: { type: mongoose.Schema.Types.ObjectId, ref: 'fashionModels' },
  variants: [
    {
      variantCollectionId: { type: mongoose.Schema.Types.ObjectId },
      variants: [
        {
          variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Variant' },
          variantValue: String,
        },
      ],
      qty: { type: Number, required: true },
    },
  ],
  currency: { type: String, default: 'SR' },
  createDate: {
    type: Date,
    default: Date.now,
  },
  qty: { type: Number, requierd: true },
  threshold: { type: Number, requierd: true },
  isActive: { type: Boolean, default: true },
  isFeature: { type: Boolean, default: false },
  new: { type: Boolean, default: false },
  order:Number,
  discount: { type: Number, default: 0 },
  thumbnail: {
    path: { type: String, requierd: true },
    key: { type: String },
  },
  video: { type: String },
  tags: [String],
});
