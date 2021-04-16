import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FashionModelController } from './fashion-model.controller';
import { FashionModelService } from './fashion-model.service';
import { fashionModelSchema } from '../models/fashionModel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'fashionModels', schema: fashionModelSchema },
    ]),
  ],
  controllers: [FashionModelController],
  providers: [FashionModelService],
})
export class FashionModelModule {}
