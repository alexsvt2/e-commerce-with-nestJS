/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { product } from 'src/types/product';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(@InjectModel('Product') private productModel: Model<product>) {}

  async findAll(): Promise<product[]> {
    return await this.productModel.find().populate('category');
  }

  async findByCategory(id: any): Promise<product[]> {
    return await this.productModel.find({ category: id }).populate('category');
  }

  async findById(id: string): Promise<product> {
    const product = await this.productModel.findById(id).populate('category');
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NO_CONTENT);
    }
    return product;
  }

  async create(productDTO: CreateProductDTO): Promise<product> {
    const product = await this.productModel.create({
      ...productDTO
    });
    await product.save();
    return product.populate('category');
  }

  async update(
    id: string,
    productDTO: UpdateProductDTO,
  ): Promise<product> {
    const product = await this.productModel.findById(id);

    await product.update(productDTO);
    return await this.productModel.findById(id).populate('category');
  }


  async delete(id: string): Promise<product> {
    const product = await this.productModel.findById(id);

    await product.remove();
    return product.populate('owner');
  }
}
