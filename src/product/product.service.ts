/* eslint-disable @typescript-eslint/no-inferrable-types */
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

  async findAll(page: any ) {
    const pageNo = page.page;
    const size =10;
    const query = {
      skip : size * (pageNo - 1),
      limit : size
    }

    const products = await this.productModel.find({},{},query)
      .populate('category')
      .sort({'createDate': -1});

    const productsCount = products.length;
    const totalPages = Math.ceil(productsCount / size)
    return {products, totalPages}
  }

  // filter 
  async filterFindAll(page: any , filterBody: CreateProductDTO) {
    const filter = filterBody;
    const pageNo = page.page;
    const size =10;
    const query = {
      skip : size * (pageNo - 1),
      limit : size
    }


    const products = await this.productModel.find( filter, {}, query)
    .populate('category')
    .sort({'createDate': -1});

    const productsCount = products.length;
    const totalPages = Math.ceil(productsCount / size)
    return {products, totalPages}
   
  }
  // by category
  async findByCategory(id: any , page: any) {
    const pageNo = page.page;
    const size =10;
    const query = {
      skip : size * (pageNo - 1),
      limit : size
    }

    const products =  await this.productModel.find({ category: id},{},query )
    .populate('category')
     .sort({'createDate': -1});

     const productsCount = products.length;
    const totalPages = Math.ceil(productsCount / size)
    return {products, totalPages}
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
