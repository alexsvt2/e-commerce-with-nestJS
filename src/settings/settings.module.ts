import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { settingsSchema } from '../models/settings.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Settings', schema: settingsSchema }]),
  ],
  exports: [SettingsService],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
