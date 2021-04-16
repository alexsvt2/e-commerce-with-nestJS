import { Controller, Get, Post, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsDto } from './settings.dto';

@Controller('settings')
export class SettingsController {
  constructor(private settingService: SettingsService) {}

  @Post()
  async create(settingDto: SettingsDto) {
    return await this.settingService.create(settingDto);
  }

  @Get()
  async get() {
    return await this.settingService.getAll();
  }

  @Put()
  async update(settingDto: SettingsDto) {
    return await this.settingService.update(settingDto);
  }
}
