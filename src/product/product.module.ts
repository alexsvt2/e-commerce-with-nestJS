import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from 'src/models/product.schema';
import { OrderingService } from 'src/shared/ordering.service';
import { SharedModule } from 'src/shared/shared.module';
import { FilesService } from 'src/shared/uploadFile.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
    SharedModule,
    SettingsModule,
  ],
  exports: [
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
