import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variant } from '../types/variant';
import { VariantDTO } from './variant.dto';

@Injectable()
export class VariantService {
  constructor(@InjectModel('Variant') private variantModel: Model<Variant>) {}

  async findAll(): Promise<Variant[]> {
    return await this.variantModel.find();
  }

  async getById(id: any): Promise<Variant> {
    return await this.variantModel.findById(id);
  }

  async create(variantDto: VariantDTO): Promise<Variant> {
    const variant = await this.variantModel.create({
      ...variantDto,
    });
    await variant.save();
    return variant;
  }

  async update(id: string, variantDto: VariantDTO): Promise<Variant> {
    const variant = await this.variantModel.findById(id);

    await variant.update(variantDto);
    return await this.variantModel.findById(id);
  }

  async delete(id: string): Promise<Variant> {
    const variant = await this.variantModel.findById(id);

    await variant.remove();
    return variant;
  }
}
