import { Module } from '@nestjs/common';
import { ShipmentMethodController } from './shipment-method.controller';
import { ShipmentMethodService } from './shipment-method.service';
import { shippingSchema } from '../models/shipping.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ShippingMethods', schema: shippingSchema },
    ]),
  ],
  controllers: [ShipmentMethodController],
  providers: [ShipmentMethodService],
})
export class ShipmentMethodModule {}
