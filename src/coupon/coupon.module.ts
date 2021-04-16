import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { couponSchema } from '../models/coupon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Coupons', schema: couponSchema }]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
