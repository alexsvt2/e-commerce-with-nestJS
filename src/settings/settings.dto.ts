import { ApiProperty } from '@nestjs/swagger';
import { Version } from 'src/types/settings';

export class SettingsDto {
  @ApiProperty()
  vat: number;
  @ApiProperty()
  version:Version;
  @ApiProperty()
  cod:number
}
