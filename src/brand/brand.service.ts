import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from 'src/types/brand';
import { BrandDTO } from './brand.dto';

@Injectable()
export class BrandService {
  constructor(@InjectModel('Brand') private brandModel: Model<Brand>) {}

  async findAll(): Promise<Brand[]> {
    return await this.brandModel.find();
  }

  async getById(id: any): Promise<Brand> {
    return await this.brandModel.findById(id);
  }

  async create(BrandDTO: BrandDTO): Promise<Brand> {
    const brand = await this.brandModel.create({
      ...BrandDTO,
    });
    await brand.save();
    return brand;
  }

  async update(id: string, BrandDTO: BrandDTO): Promise<Brand> {
    const brand = await this.brandModel.findById(id);

    await brand.update(BrandDTO);
    return await this.brandModel.findById(id);
  }

  async delete(id: string): Promise<Brand> {
    const product = await this.brandModel.findById(id);

    await product.remove();
    return product;
  }
}
