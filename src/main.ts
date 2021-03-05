/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
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

await app.listen(process.env.PORT || '80');
}
bootstrap();
