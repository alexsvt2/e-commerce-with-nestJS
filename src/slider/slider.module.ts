import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { sliderSchema } from '../models/slider.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Slider', schema: sliderSchema }]),
    SharedModule,
  ],
  providers: [SliderService],
  controllers: [SliderController],
})
export class SliderModule {}
