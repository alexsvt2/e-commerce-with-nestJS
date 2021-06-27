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
  country: string;
}

export interface User extends Document {
  fullName: string;
  email: string;
  isAdmin: boolean;
  otp:string;
  phoneNumber: string;
  mobileToken: string;
  password: string;
  isGuest: boolean;
  address: Address[];
}
