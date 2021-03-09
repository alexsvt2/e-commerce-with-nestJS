/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class Name{
    @ApiProperty()
    ar:string;
    @ApiProperty()
  en: string;
}


export class Description{
  @ApiProperty()
  ar:string;
  @ApiProperty()
en: string;
}
