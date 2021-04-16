import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon } from 'src/types/coupon';
import { CouponDto } from './coupon.dto';

@Injectable()
export class CouponService {
  constructor(@InjectModel('Coupons') private couponModel: Model<Coupon>) {}

  async create(couponDto: CouponDto) {
    const coupon = await this.couponModel.create({ ...couponDto });
    await coupon.save();
    return coupon;
  }

  async getAll() {
    return await this.couponModel.find().sort({ createDate: -1 });
  }

  async getById(id: string) {
    return await this.couponModel.findById(id);
  }

  async getByName(name: string) {
    const coupon = await this.couponModel.find({
      couponName: name,
      status: true,
    });

    if (!coupon) {
      throw new HttpException('Invalid coupon', HttpStatus.NOT_FOUND);
    } else {
      return coupon;
    }
  }

  async updateStatus(id: string, status: boolean) {
    const coupon = await this.couponModel.updateOne(
      { _id: id },
      {
        $set: { status: status },
      },
    );
    return coupon;
  }
}
