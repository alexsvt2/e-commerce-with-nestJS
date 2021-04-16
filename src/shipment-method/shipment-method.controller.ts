import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShipmentMethodService } from './shipment-method.service';
import { ShipmentDto } from './shipment.dto';

@ApiTags('Shipping')
@Controller('shipment-method')
export class ShipmentMethodController {
  constructor(private shpService: ShipmentMethodService) {}

  @Post()
  async create(shpDto: ShipmentDto) {
    return await this.shpService.create(shpDto);
  }

  @Get()
  async getAll() {
    return await this.shpService.getAll();
  }

  @Put()
  async update(shpDto: ShipmentDto, id: string) {
    return this.shpService.update(shpDto, id);
  }

  @Delete()
  async delete(id: string) {
    return this.shpService.delete(id);
  }
}
