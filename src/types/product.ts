/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { Category } from './category';
import { Name } from './shared.dto';

export interface Image {
  path: string,
  order ?: number,
  key: string
}




export interface product extends Document {
    productName:Name,
    serialNumber :string,
    image: [Image],
    description: string,
    price : number,
    category: 
    [Category]
    ,
    currency:string,
    qty:number,
    threshold:number,
    isActive:boolean,
    isFeature: boolean ,
    discount : number,
    thumbnail:  Image  ,
    video: string
}