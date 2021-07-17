import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { invoiceSchema } from '../models/invoice.schema';
import { productSchema } from '../models/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invoices', schema: invoiceSchema }]),
  ],
  controllers: [InvoiceController],
  exports: [InvoiceService,
    MongooseModule.forFeature([{ name: 'Invoices', schema: invoiceSchema }])],
  providers: [InvoiceService],
})
export class InvoiceModule {}
