import { ApiProperty } from '@nestjs/swagger';

export class SettingsDto {
  @ApiProperty()
  vat: number;
}
