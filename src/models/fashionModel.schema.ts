/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const fashionModelSchema = new mongoose.Schema({
  modelName: String,
  modelWear: String,
  height: String,
  bust: String,
  waist: String,
  hips: String,
  createDate: {
    type: Date,
    default: Date.now,
  },
});
