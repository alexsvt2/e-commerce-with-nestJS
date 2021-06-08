import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wishlist } from '../types/wishlist';
import { WishlistDto } from './wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel('wishlists') private wishlistModel: Model<Wishlist>,
  ) {}

  async create(product: string, userId: string) {
    // checl if this user have any wishlist
    const wishList = await this.wishlistModel.findOne({ user: userId });

    if (wishList) {
      wishList.products.push(product);
      await wishList.save();
      return wishList;
    } else {
      let wishListDto = new WishlistDto();
      wishListDto = {
        user: userId,
        products: [product],
      };

      const wishlist = await this.wishlistModel.create({ ...wishListDto });
      await wishlist.save();
      return wishlist;
    }
  }

  async get(userId: string) {
    const wishlist = await this.wishlistModel
      .findOne({ user: userId })
      .populate('products');

    if (!wishlist) {
      throw new HttpException(
        'this user dont have any products at wishlist',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return wishlist;
    }
  }

  async deleteOne(userId: string, productId:string) {
    const wishlist = await this.wishlistModel
      .findOne({ user: userId })
      .populate('products');

  const deleteFromWishList = wishlist.products.filter(x => x !== productId);

  wishlist.products = deleteFromWishList ; 
  return await wishlist.save()
  }
}
