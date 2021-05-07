/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { variant } from './product';
import { Name } from './shared.dto';

export class cartProduct {
  productId: string;
  qtyOfProduct: number;
  variantIdOfProduct: string;
  orginalProduct?:object;
  variant: cartVariant;
}

export class cartVariant {
  _id: string;
  variants: variant[];
  
}

export class cartVariantDetails {
  variantName: Name;
  variantValues: string[];
}

export interface Cart extends Document {
  user: string;
  products: cartProduct[];
}
