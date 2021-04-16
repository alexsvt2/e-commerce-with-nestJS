import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { fashionModel } from 'src/types/fashionModel';
import { FashionModelService } from './fashion-model.service';
import { fashionModelDto } from './fashionModel.dto';

@ApiTags('Fasion-Model')
@Controller('fashion-model')
export class FashionModelController {
  constructor(private fashionModelService: FashionModelService) {}

  @Post('/create')
  async createCategory(
    @Body() fashionModelDto: fashionModelDto,
  ): Promise<fashionModel> {
    return await this.fashionModelService.create(fashionModelDto);
  }

  @Get('/getAll')
  async getmodels(): Promise<fashionModel[]> {
    return await this.fashionModelService.findAll();
  }

  @Get('/getById/:id')
  async getModelsById(@Param('id') id: string): Promise<fashionModel> {
    return await this.fashionModelService.getById(id);
  }

  @Put('/update/:id')
  async updateModel(
    @Param('id') id: string,
    @Body() fashionModelDto: fashionModelDto,
  ): Promise<fashionModel> {
    return await this.fashionModelService.update(id, fashionModelDto);
  }

  @Delete('/delete/:id')
  async deleteModel(@Param('id') id: string): Promise<fashionModel> {
    return this.fashionModelService.delete(id);
  }
}
