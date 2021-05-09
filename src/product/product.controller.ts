/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { product } from 'src/types/product';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createProduct(@Body() product: CreateProductDTO): Promise<product> {
    return await this.productService.create(product);
  }

  @Get('/allProducts')
  //@UseGuards(AuthGuard('jwt') , AdminGuard)
  async getAllProduct(@Query() query: any) {
    const { perPage, page, ...restQuery } = query;
    return await this.productService.findAll(page, perPage, restQuery);
  }

  @Get()
  //@UseGuards(AuthGuard('jwt') , AdminGuard)
  async getAllProductList() {
    return await this.productService.findAllList();
  }

  @Get('/getByCategory/:id')
  async getProductByCategoryId(@Param('id') id: string, @Query() query: any) {
    const { perPage, page } = query;

    return this.productService.findByCategory(id, page, perPage);
  }

  @Get('/getByBrand/:id')
  async getProductByBrandId(@Param('id') id: string, @Query() query: any) {
    const { perPage, page } = query;

    return this.productService.findByBrand(id, page, perPage);
  }

  @Get('/getById/:id')
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  async getProductById(@Param('id') id: string): Promise<product> {
    return this.productService.findById(id);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  deleteProduct(@Param('id') id: string): Promise<product> {
    return this.productService.delete(id);
  }

  @Put('/update/:id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async updateProduct(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param('id') id: string,
    @Body() product: UpdateProductDTO,
  ): Promise<product> {
    return await this.productService.update(id, product);
  }

  @Delete('/deleteImg')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async deleteImage(@Query() params: any, @Param('key') key: string) {
    return this.productService.deleteImage(params, key);
  }

  @Post()
  async getInvoiceCalculate(@Body() products: any) {
    return this.productService.amountCalculate(products);
  }
}
