/* eslint-disable prettier/prettier */
import { Image } from '../types/product';
import { ApiProperty } from '@nestjs/swagger';
import { Name } from 'src/types/shared.dto';

export class CategoryDTO {
    @ApiProperty()
    categoryName: Name;
    @ApiProperty()
    image: Image
}