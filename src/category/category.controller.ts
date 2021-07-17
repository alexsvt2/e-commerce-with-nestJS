/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Category } from 'src/types/category';
import { CategoryDTO } from './category.dto';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private categoruService:CategoryService) { }

    @Post('/create')
    async createCategory(@Body() category: CategoryDTO): Promise<Category> {
        return await this.categoruService.create(category);
     }

    @Get('/getAll')
    async getCategories() : Promise<Category[]>{ 
       return await this.categoruService.findAll();
    }

    // @Get('/insertAll')
    // async insertAll() { 
    //    return await this.categoruService.insertAlldataToQoyoud();
    // }
    
    @Get('/getById/:id')
    async getCategoryById(@Param('id') id: string): Promise<Category> { 
       return await this.categoruService.getById(id);
    }

    @Put('/update/:id')
    async updateCategory(  @Param('id') id: string,
    @Body() category: CategoryDTO): Promise<Category> { 
        return await this.categoruService.update(id,category);
    }

    @Delete('/delete/:id')
    async deleteCategory(@Param('id') id: string): Promise<Category> {
        return this.categoruService.delete(id);
    }
}
