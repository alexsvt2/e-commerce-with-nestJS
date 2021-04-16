import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderSchema } from '../models/order.schema';
import { productSchema } from 'src/models/product.schema';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Orders', schema: orderSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
    InvoiceModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
