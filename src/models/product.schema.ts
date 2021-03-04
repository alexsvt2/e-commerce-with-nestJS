/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
export const productSchema = new mongoose.Schema({
  productName: { 
    ar:{type: String, requierd: true},
    en:{type: String, requierd: true},
  },
  serialNumber : {type:String , requierd:true},
  image: [{
    path:{type: String , requierd:true},
    order:{type:Number },
    key:{type:String}
  }],
  description: {type:String, requierd:true},
  price : {type:Number , requierd:true},
  category: 
    [{type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'}]
  ,
  currency:{type:String, default:'SR'},
  createDate: {
    type: Date,
    default: Date.now,
  },
  qty:{type:Number,requierd:true},
  threshold:{type:Number,requierd:true},
  isActive:{type:Boolean,default:true},
  isFeature: {type:Boolean ,default:false},
  discount : {type:Number},
  thumbnail:{
    path:{type: String , requierd:true},
    key:{type:String}
  },
  video: {type:String}
});
