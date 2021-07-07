/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const notifyUser = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  createDate: {
    type: Date,
    default: Date.now,
  },
});
