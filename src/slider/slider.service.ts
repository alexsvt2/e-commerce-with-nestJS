import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/shared/uploadFile.service';
import { Slider } from '../types/slider';
import { SliderDto } from './slider.dto';

@Injectable()
export class SliderService {
  constructor(
    @InjectModel('Slider') private sliderModel: Model<Slider>,
    private uploadfileService: FilesService,
  ) {}

  async deleteImage(key: string,id:string) {
    const slider = await this.sliderModel.findByIdAndDelete(id);
    
    this.uploadfileService.deletePublicFile(key);


    return 'updated';
  }

  async create(sliderDto: SliderDto) {
 
      const newSlider = await this.sliderModel.create({ ...sliderDto });
      await newSlider.save();
      return newSlider;
    
  }

  async get() {
    return await this.sliderModel.find();
  }
}
