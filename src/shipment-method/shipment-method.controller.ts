import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShipmentMethodService } from './shipment-method.service';
import { ShipmentDto } from './shipment.dto';

@ApiTags('Shipping')
@Controller('shipment-method')
export class ShipmentMethodController {
  constructor(private shpService: ShipmentMethodService) {}

  @Post()
  async create(@Body() shpDto: ShipmentDto) {
    return await this.shpService.create(shpDto);
  }

  @Get()
  async getAll() {
    return await this.shpService.getAll();
  }
  @Get('/:id')
  async get(@Param('id') id: string) {
    return await this.shpService.get(id);
  }

  @Put('/:id')
  async update(@Body() shpDto: ShipmentDto, @Param('id') id: string) {
    return this.shpService.update(shpDto, id);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return this.shpService.delete(id);
  }
}
