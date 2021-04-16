import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { wishlistSchema } from '../models/wishlist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'wishlists', schema: wishlistSchema }]),
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
