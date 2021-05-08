import * as mongoose from 'mongoose';

export const sliderSchema = new mongoose.Schema({
  images: [
    {
      path: { type: String, requierd: true },
      order: { type: Number },
      key: { type: String },
      redirect: String,
      type:String
    },
  ],
});
