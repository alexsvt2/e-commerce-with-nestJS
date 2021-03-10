import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from 'src/models/product.schema';
import { SharedModule } from 'src/shared/shared.module';
import { FilesService } from 'src/shared/uploadFile.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
    SharedModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
