/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { product } from 'src/types/product';
@Injectable()
export class OrderingService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // constructor(@InjectModel('Product') private productModel: Model<product>) {}
  // async amountCalculate(products: string[]) {
  //   let total = 0;
  //   let tax = 0.15;
  //   let totalWithTax = 0;
  //   for (let i = 0; i < products.length; i++) {
  //     let product = await this.productModel.findById(products[i]);
  //     total += product.price;
  //     totalWithTax += product.price * tax;
  //   }
  //   return { total, totalWithTax };
  // }
}
