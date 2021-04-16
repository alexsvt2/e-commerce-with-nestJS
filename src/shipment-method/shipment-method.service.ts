import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from 'src/types/shipment';
import { ShipmentDto } from './shipment.dto';

@Injectable()
export class ShipmentMethodService {
  constructor(
    @InjectModel('ShippingMethods') private userModel: Model<Shipment>,
  ) {}

  async create(shippingDto: ShipmentDto) {
    const shp = await this.userModel.create({ ...shippingDto });
    await shp.save();
    return shp;
  }

  async getAll() {
    return await this.userModel.find();
  }

  async update(shippingDto: ShipmentDto, userId: string) {
    const shp = await this.userModel.findById(userId);

    await shp.update(shippingDto);
    return await this.userModel.findById(userId);
  }

  async delete(id: string) {
    const shp = await this.userModel.findById(id);

    await shp.remove();
    return shp;
  }
}
