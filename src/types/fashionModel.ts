import { Document } from 'mongoose';

export interface fashionModel extends Document {
  modelName: string;
  modelWear: string;
  height: string;
  bust: string;
  waist: string;
  hips: string;
}
