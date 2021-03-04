/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { Image } from './product';
import { Name } from './shared.dto';

export interface Category extends Document{
    categoryName: Name;
    image:Image
}
