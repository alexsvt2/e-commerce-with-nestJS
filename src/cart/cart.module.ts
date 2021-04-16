import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { cartSchema } from 'src/models/cart.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cart', schema: cartSchema }])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
