import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { categorySchema } from 'src/models/category.schema';
import { SharedModule } from 'src/shared/shared.module';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { brandSchema } from '../models/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Brand', schema: brandSchema }]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
