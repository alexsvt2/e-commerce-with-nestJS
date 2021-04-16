import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/shared/uploadFile.service';
import { Slider, SliderImage } from '../types/slider';
import { SliderDto } from './slider.dto';

@Injectable()
export class SliderService {
  constructor(
    @InjectModel('Slider') private sliderModel: Model<Slider>,
    private uploadfileService: FilesService,
  ) {}

  async deleteImage(key: string) {
    const slider = await this.sliderModel.find();
    let images = slider[0].images;
    this.uploadfileService.deletePublicFile(key);
    slider[0].images = images.filter((el) => el.key !== key);
    await slider[0].save();

    return 'updated';
  }

  async create(sliderObj: SliderImage) {
    const slider = await this.sliderModel.find();

    if (slider) {
      slider[0].images.push(sliderObj);
      await slider[0].save();
      return slider;
    } else {
      // we need create slider for the first time
      let sliderDto = new SliderDto();
      sliderDto = {
        images: [sliderObj],
      };
      const newSlider = await this.sliderModel.create({ ...sliderDto });
      await newSlider.save();
      return newSlider;
    }
  }

  async get() {
    return await this.sliderModel.find();
  }
}
