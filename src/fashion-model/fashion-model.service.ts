import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { fashionModel } from '../types/fashionModel';
import { fashionModelDto } from './fashionModel.dto';

@Injectable()
export class FashionModelService {
  constructor(
    @InjectModel('fashionModels') private fashionModel: Model<fashionModel>,
  ) {}

  async findAll(): Promise<fashionModel[]> {
    return await this.fashionModel.find();
  }

  async getById(id: any): Promise<fashionModel> {
    return await this.fashionModel.findById(id);
  }

  async create(fashionModelDto: fashionModelDto): Promise<fashionModel> {
    const model = await this.fashionModel.create({
      ...fashionModelDto,
    });
    await model.save();
    return model;
  }

  async update(
    id: string,
    fashionModelDto: fashionModelDto,
  ): Promise<fashionModel> {
    const model = await this.fashionModel.findById(id);

    await model.update(fashionModelDto);
    return await this.fashionModel.findById(id);
  }

  async delete(id: string): Promise<fashionModel> {
    const model = await this.fashionModel.findById(id);

    await model.remove();
    return model;
  }
}
