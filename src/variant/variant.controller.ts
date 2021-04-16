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
import { Variant } from 'src/types/variant';
import { VariantDTO } from './variant.dto';
import { VariantService } from './variant.service';

@ApiTags('Variants')
@Controller('variant')
export class VariantController {
  constructor(private variantService: VariantService) {}

  @Post('/create')
  async createVariant(@Body() variant: VariantDTO): Promise<Variant> {
    return await this.variantService.create(variant);
  }

  @Get('/getAll')
  async getVariants(): Promise<Variant[]> {
    return await this.variantService.findAll();
  }

  @Get('/getById/:id')
  async getVariantById(@Param('id') id: string): Promise<Variant> {
    return await this.variantService.getById(id);
  }

  @Put('/update/:id')
  async updateVariant(
    @Param('id') id: string,
    @Body() variant: VariantDTO,
  ): Promise<Variant> {
    return await this.variantService.update(id, variant);
  }

  @Delete('/delete/:id')
  async deleteVariant(@Param('id') id: string): Promise<Variant> {
    return this.variantService.delete(id);
  }
}
