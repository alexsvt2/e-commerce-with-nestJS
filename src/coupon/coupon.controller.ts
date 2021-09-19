import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CouponDto } from './coupon.dto';
import { CouponService } from './coupon.service';

@ApiTags('Coupon')
@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Get()
  async getAll() {
    return await this.couponService.getAll();
  }

  @Get('/getCoupon/:name')
  async getByName(@Param('name') name: string , @Query("orderAmount") orderAmount?:number) {
    return await this.couponService.getByName(name,orderAmount);
  }

  @Get('/getById/:id')
  async getById(@Param('id') id: string) {
    return await this.couponService.getById(id);
  }

  @Post()
  async create(@Body() couponDto: CouponDto) {
    return await this.couponService.create(couponDto);
  }

  @Put('/updateCouponStatus')
  async update(@Body('status') status: boolean, @Body('id') id: string) {
    return await this.couponService.updateStatus(id, status);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return await this.couponService.deleteCoupon(id);
  }
}
