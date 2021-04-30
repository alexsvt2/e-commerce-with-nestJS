/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SettingsService } from 'src/settings/settings.service';
import { FilesService } from 'src/shared/uploadFile.service';
import { product } from 'src/types/product';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectModel('Product') private productModel: Model<product>,
    private uploadfileService: FilesService,
    private settingsService: SettingsService,
  ) {}

  async findAll(page: number = 1, perPage: number = 10, query: any) {
    const pageNo = Number(page);
    const size = Number(perPage);
    const queryPage = {
      skip: size * (pageNo - 1),
      limit: size,
    };
    let products;

    if (query) {
      // const productNameFilter = 'Test';
      // eslint-disable-next-line prefer-const
      products = await this.productModel
        .find(
          {},
          // {
          //   'productName.en': {
          //     $regex: productNameFilter,
          //     $options: 'i' as never,
          //   },
          // },
          {},
          query,
        )
        .populate('category brand fashionModel')
        .populate('variants.variants.variantId')
        .sort({ createDate: -1 });
    } else {
      products = await this.productModel
        .find(query, {}, queryPage)
        .populate('category brand fashionModel')
        .populate('variants.variants.variantId')
        .sort({ createDate: -1 });
    }

    const productsCount = await this.productModel.count(query);
    const totalPages = Math.ceil(productsCount / size);
    return { products, totalPages };
  }

  // filter
  async filterFindAll(page: any, filterBody: CreateProductDTO) {
    const filter = filterBody;

    const pageNo = page.page;
    const size = 10;
    const query = {
      skip: size * (pageNo - 1),
      limit: size,
    };

    if (filterBody.productName) {
      const productNameFilter = '.*' + filter.productName + '.*';
      // eslint-disable-next-line prefer-const
      const products = await this.productModel
        .find(
          { productName: { $regex: productNameFilter as never } },
          {},
          query,
        )
        .populate('category brand fashionModel')
        .populate('variants.variants.variantId')
        .sort({ createDate: -1 });
    }

    // eslint-disable-next-line prefer-const
    const products = await this.productModel
      .find(filter, {}, query)
      .populate('category brand fashionModel')
      .populate('variants.variants.variantId')
      .sort({ createDate: -1 });

    const productsCount = products.length;
    const totalPages = Math.ceil(productsCount / size);
    return { products, totalPages };
  }
  // by category
  async findByCategory(id: any, page: number = 1, perPage: number = 10) {
    const pageNo = Number(page);
    const size = Number(perPage);
    const query = {
      skip: size * (pageNo - 1),
      limit: size,
    };

    const products = await this.productModel
      .find({ category: id }, {}, query)
      .populate('category fashionModel brand')
      .populate('variants.variants.variantId')
      .sort({ createDate: -1 });

    const productsCount = await this.productModel.count({ category: id });
    const totalPages = Math.ceil(productsCount / size);
    return { products, totalPages };
  }

  // find by brand

  // by category
  async findByBrand(id: any, page: number = 1, perPage: number = 10) {
    const pageNo = Number(page);
    const size = Number(perPage);
    const query = {
      skip: size * (pageNo - 1),
      limit: size,
    };

    const products = await this.productModel
      .find({ brand: id }, {}, query)
      .populate('category fashionModel brand')
      .populate('variants.variants.variantId')
      .sort({ createDate: -1 });

    const productsCount = await this.productModel.count({ brand: id });
    const totalPages = Math.ceil(productsCount / size);
    return { products, totalPages };
  }

  async findById(id: string): Promise<product> {
    const product = await this.productModel
      .findById(id)
      .populate('category brand fashionModel')
      .populate('variants.variants.variantId');
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NO_CONTENT);
    }
    return product;
  }

  async create(productDTO: CreateProductDTO): Promise<product> {
    const product = await this.productModel.create({
      ...productDTO,
    });
    await product.save();
    return product.populate('category');
  }

  async update(id: string, productDTO: UpdateProductDTO): Promise<product> {
    const product = await this.productModel.findById(id);

    await product.update(productDTO);
    return await this.productModel.findById(id).populate('category');
  }

  async delete(id: string): Promise<product> {
    const product = await this.productModel.findById(id);

    await product.remove();
    return product.populate('owner');
  }

  async deleteImage(params: any, key: string) {
    const { id, type } = params;

    this.uploadfileService.deletePublicFile(key);

    if (id) {
      const product = await this.productModel.findById(id);
      if (type == 'image') {
        const images = product.image;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        product.image = images.filter((el) => el.key !== key);
        product.save();
      } else if (type == 'thumbnail') {
        product.thumbnail = null;
        product.save();
      } else {
        product.video = null;
        product.save();
      }
    }

    return 'Deleted';
  }

  async amountCalculate(products: string[]) {
    let getVat = this.settingsService.getAll();
    let total = 0;
    let tax = getVat[0].vat || 0.15;
    let totalWithTax = 0;

    for (let i = 0; i < products.length; i++) {
      let product = await this.productModel.findById(products[i]);
      if (product.discount !== 0) {
        let totalWithDiscount = product.price * product.discount;
        total += product.price - totalWithDiscount;
      } else {
        total += product.price;
      }
    }
    const calculatedTax = total * tax;
    totalWithTax = total + calculatedTax;
    return { total, totalWithTax };
  }
}
