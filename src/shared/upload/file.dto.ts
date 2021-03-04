/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
 @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
  @ApiProperty({ type: 'string'})
  key: string;
}
