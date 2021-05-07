/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { String } from 'aws-sdk/clients/cloudwatchevents';
import { Model } from 'mongoose';
import { Cart } from 'src/types/cart';
import { CartDTO } from './cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private cartModel: Model<Cart>) {}

  async create(cartDto: CartDTO, userId: string): Promise<Cart> {
    const userCart = await this.cartModel.findOne({ user: userId });
    if (userCart) {
      for (let i = 0; i < cartDto.products.length; i++)
        userCart.products.push(cartDto.products[i]);

      await userCart.save();

      return userCart;
    } else {
      const createCart = {
        user: userId,
        products: cartDto.products,
      };
      const cart = await this.cartModel.create(createCart);
      return cart;
    }
  }

  async getCartList(userId: string) {
    const products = await this.cartModel
      .findOne({ user: userId })
      .populate('products.productId ');

    if (!products) {
      throw new HttpException('No Orders Found', HttpStatus.NO_CONTENT);
    }

    return products;
  }

  async deleteListCart(userId: string, productId: string) {

    if(!userId || !productId) throw new HttpException('please insert  productID', HttpStatus.NO_CONTENT);

    const userCartList = await this.cartModel.findOne({'user':userId})
    
    if(userCartList.products.length !== 1) {
      const productsList = userCartList.products;
      userCartList.products = productsList.filter((el) => el.productId != productId);

     userCartList.save();
      return userCartList.populate('products.productId ')
    } else{
      userCartList.products = [];
      userCartList.save();
      return userCartList.populate('products.productId ')
    }
  }
}
