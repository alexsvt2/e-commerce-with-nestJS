/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const categorySchema = new mongoose.Schema({
  categoryName: {
    ar: { type: String, requierd: true },
    en: { type: String, requierd: true },
  },
  image: {
    path: { type: String, requierd: true },
    key: { type: String },
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  qoyoudId:String
});
