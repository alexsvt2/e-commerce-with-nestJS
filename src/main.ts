/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const firaBasePrivateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCsicTERplO1b4p\nOyKiERbA2OjsUdBMe7ptpZxkLiXGG9u+2TzWUvBwp4sP2C4BIlvDWZ+gCfm8L+is\nDaYpbvLbrGdliqLquQvtCt/iV3KoNXMinQE0Anj8WXqAX8Ej0407Hu1NORkQWUII\nNqwQOXcFddX5t8x/Z7NtiJdN8qTpq4QNDGsv2qeiIfONuHpnZmpLJpJTbEc2KIQ6\nb5Saam8Fo8YIS8gjByxl8x6KB9/RYKm2kdWT0kJ0Ilb9hzvx1efkVIeZqXaQxFPS\nwhHlPey3xe2VXUjp0peC7Zps6qLONKK/VGnihZLkYCuNcsyMSmYukJd47Q03y9ua\nzZktu0FHAgMBAAECggEACRNjeEzxD4aKxDHKIUBI3sgKKIl9LX4XUQvfGB3ypWMd\nwgI8rawbMwcnzM469/BOEg6K06jyrAV7ywvEwR/cQoCPx8rtGu+07Y50NxG72Zab\ngdHvGESbse/QU88K987O+lx8Gw3KgGOm54uzV/8jKvRcgbrl/5BS4zYbegwuGeRy\nUXLKf2s+CQQC4S4fOfOpbgDH/ctdpc1xewlnwSRklWmCrg09XYbgKfL6Md3sVL2V\nXrUHy3lDapHo896DaYFo2/PoykARW7DNtxod+P8lqW/MZsck+Yr2Y85JRdPFfRYZ\njkx3sWFQTLqH5l01ZE3KbZ7jhQ0IpWUiUpQ06YK0YQKBgQDVlShqlrHXw1UPBg5l\n6EDBP9aH9VFUIHc7K3ciY5zsgaGaCw7/FcYtvMiZf0pUq0DeDBZHcvgjECUnAyVv\n11REoQho/qKZ7IhJ7RUKEEJJikFbc9By5c6ESNuFdP30bW2VcA+NX8aV3zolhICo\nWVTHX3LMYwPM48SGtQ0tkBRK7wKBgQDOzdnoLQGX9Tk4s8AH6pwtGpg4z9Id66Ez\nCrJVzlUUefOcJ58M3mcJ/HNuwCyfTGY8Um4AplfN0M49qImOHpqck8m2exSnY90U\nQEkxx9R6Y+qd0kYb6vhY03E0GY+ouFYUQrFIMxBzb/jgSzPnluAhJ6LId1lbecTq\nFT0qfFzPKQKBgQC4bmTIJfjMaFA6+O/V8Ah617VZEe14x9AtuArYF0yarhXt/z6j\n5xmKxUozwkdddcQ9+hIDALRlErwCRCU/vqF14dhxUfD3GdlWfPN+DSwwdMKbRhbq\nIKeEc6WcSLpDJ3tJX8sOOXYyVODRJOo0dW9P+owXEill9AjwiccnYRMk4QKBgQCB\n9rf0wyP3PXMCgWQzFWukpMv5GBGyH/ykORqt9gdd4O4JupSn37Tdf7uDZF4mljrB\nugPLgL45Z/nUofAgUndT40Sm2161e3raWTQmhrCvYc9180mADgCYwfioh0/S9lWS\nUf9boku6YCoFuv0Zk6Wy8FfKp8aOSE5J1aMk6hbhUQKBgQCVDh9ipKYEr0Km70WS\nGBJqCQW11bL6yBAcSgicpQSNq07W3egqPrxxvfdQKdbbkIfYVAvPK4yVhjgfFBaD\nyAN+YraXmc2sIpiL4k8I5El0iNtyNu+FV/rz82BASKylhmtfFSTDcwLw7X2VQ3UX\nrIiO0gbVp0wsr+oRv+vF80Z1lw==\n-----END PRIVATE KEY-----\n"
  const configService = app.get(ConfigService);
   // Set the config options
   const adminConfig: ServiceAccount = {
    "projectId":"commaa-7cd36",
    "privateKey": firaBasePrivateKey.replace(/\\n/g, '\n'),
    "clientEmail":"firebase-adminsdk-rbh6b@commaa-7cd36.iam.gserviceaccount.com",
  };
    // Initialize the firebase admin app
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig)
    });
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  const swaConfig = new DocumentBuilder()
    .setTitle('e-commerce api documention')
    .setDescription('The e-commerce API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaConfig);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen('8080');
}
bootstrap();
