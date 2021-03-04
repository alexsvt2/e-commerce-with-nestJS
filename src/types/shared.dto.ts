/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class Name{
    @ApiProperty()
    ar:string;
    @ApiProperty()
  en: string;
}

