/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put,Query } from '@nestjs/common';
import { product } from 'src/types/product';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}


    @Post('/create')
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     async createProduct(@Body() product: CreateProductDTO): Promise<product>{
        return await this.productService.create(product);
     }

     @Get('/allProducts')
     async getAllProduct(@Query() query:any){
         const {perPage , page, ...restQuery} = query
         return await this.productService.findAll(page,perPage , restQuery);
     }

 

     @Get('/getByCategory/:id')
     async getProductByCategoryId(@Param('id') id: string,
     @Query() query:any){
        const {perPage , page} = query

         return this.productService.findByCategory(id,page,perPage);
     }

     @Get('/getById/:id')
     async getProductById(@Param('id') id: string): Promise<product>{
         return this.productService.findById(id);
     }

     @Delete('/delete/:id')
     deleteProduct(@Param('id') id: string): Promise<product>{
         return this.productService.delete(id);
     }

     @Put('/update/:id')
    async updateProduct(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param('id') id: string,
        @Body() product: UpdateProductDTO): Promise<product>{
            return await this.productService.update(id, product);

        }
}
