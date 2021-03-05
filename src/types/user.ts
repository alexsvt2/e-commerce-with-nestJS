/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class Address {
    @ApiProperty()
    addr1: string;
    @ApiProperty()
    neighborhood: string;
    @ApiProperty()
    city: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    country: string
}



export interface User extends Document {
    fullName: string;
    email: string,
    isAdmin:boolean,
    phoneNumber: string,
    password: string;
    address: [Address];
}