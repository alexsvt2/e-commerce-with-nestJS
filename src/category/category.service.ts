import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/types/category';
import { CategoryDTO } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  async getById(id: any): Promise<Category> {
    return await this.categoryModel.findById(id);
  }

  async create(categoryDTO: CategoryDTO): Promise<Category> {
    const category = await this.categoryModel.create({
      ...categoryDTO,
    });
    await category.save();
    return category;
  }

  async update(id: string, categoryDTO: CategoryDTO): Promise<Category> {
    const category = await this.categoryModel.findById(id);

    await category.update(categoryDTO);
    return await this.categoryModel.findById(id);
  }

  async delete(id: string): Promise<Category> {
    const product = await this.categoryModel.findById(id);

    await product.remove();
    return product;
  }
}
