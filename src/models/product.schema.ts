/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const productSchema = new mongoose.Schema({
  productName: { type: String, requierd: true },
  serialNumber : {type:String , requierd:true},
  image: [{type: String , requierd:true}],
  description: {type:String, requierd:true},
  price : {type:Number , requierd:true},
  currency:{type:String, default:'SR'},
  createDate: {
    type: Date,
    default: Date.now,
  }
});
