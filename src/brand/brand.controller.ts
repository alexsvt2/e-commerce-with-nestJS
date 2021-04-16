/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from 'src/types/category';
import { BrandDTO } from './brand.dto';
import { BrandService } from './brand.service';
import { ApiTags } from '@nestjs/swagger';
import { Brand } from 'src/types/brand';

@ApiTags('Brands')
@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Post('/create')
  async createBrand(@Body() category: BrandDTO): Promise<Brand> {
    return await this.brandService.create(category);
  }

  @Get('/getAll')
  async getBrand(): Promise<Brand[]> {
    return await this.brandService.findAll();
  }

  @Get('/getById/:id')
  async getBrandById(@Param('id') id: string): Promise<Brand> {
    return await this.brandService.getById(id);
  }

  @Put('/update/:id')
  async updateBrand(
    @Param('id') id: string,
    @Body() brand: BrandDTO,
  ): Promise<Brand> {
    return await this.brandService.update(id, brand);
  }

  @Delete('/delete/:id')
  async deleteBrand(@Param('id') id: string): Promise<Brand> {
    return this.brandService.delete(id);
  }
}
