import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VariantController } from './variant.controller';
import { VariantService } from './variant.service';
import { variantSchema } from '../models/variants.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Variant', schema: variantSchema }]),
  ],
  controllers: [VariantController],
  providers: [VariantService],
})
export class VariantModule {}
