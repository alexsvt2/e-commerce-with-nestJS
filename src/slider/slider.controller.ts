import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SliderService } from './slider.service';
import { ApiTags } from '@nestjs/swagger';
import { SliderDto } from './slider.dto';

@ApiTags('Slider')
@Controller('slider')
export class SliderController {
  constructor(private sliderService: SliderService) {}

  @Delete('/:id')
  async deleteImage(@Param('key') key: string,@Param('id') id: string) {
    return await this.sliderService.deleteImage(key,id);
  }

  @Post()
  async create(@Body() sliderObj: SliderDto) {
    return await this.sliderService.create(sliderObj);
  }

  @Get()
  async getAll() {
    return await this.sliderService.get();
  }
}
