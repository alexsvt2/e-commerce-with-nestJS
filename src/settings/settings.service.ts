import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from '../types/settings';
import { SettingsDto } from './settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel('Settings') private settingsModel: Model<Settings>,
  ) {}

  async create(settingsDto: SettingsDto) {
    const setting = await this.settingsModel.create({ ...settingsDto });
    await setting.save();
    return setting;
  }

  async getAll() {
    const settings = await this.settingsModel.find();
    return settings;
  }

  async update(settingDto: SettingsDto) {
    const settings = await this.settingsModel.find();
    await settings[0].update(settingDto);
    return settings[0];
  }
}
