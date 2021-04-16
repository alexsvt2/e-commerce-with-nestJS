import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderImage } from '../types/slider';

@Controller('slider')
export class SliderController {
  constructor(private sliderService: SliderService) {}

  @Delete('/:id')
  async deleteImage(@Param() key: string) {
    return await this.sliderService.deleteImage(key);
  }

  @Post()
  async create(@Body() sliderObj: SliderImage) {
    return await this.sliderService.create(sliderObj);
  }

  @Get()
  async getAll() {
    return await this.sliderService.get();
  }
}
