/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { VariantModule } from './variant/variant.module';
import { CartModule } from './cart/cart.module';
import * as Joi from '@hapi/joi';
import { BrandModule } from './brand/brand.module';
import { InvoiceModule } from './invoice/invoice.module';
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { SliderModule } from './slider/slider.module';
import { FashionModelModule } from './fashion-model/fashion-model.module';
import { ShipmentMethodModule } from './shipment-method/shipment-method.module';
import { SettingsModule } from './settings/settings.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    MongooseModule.forRoot(
      "mongodb+srv://root:admin@cluster0.ukkav.mongodb.net/commaa-prod?retryWrites=true&w=majority"
,
    ),
    SharedModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    BrandModule,
    VariantModule,
    CartModule,
    InvoiceModule,
    OrderModule,
    CouponModule,
    WishlistModule,
    SliderModule,
    FashionModelModule,
    ShipmentMethodModule,
    SettingsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
