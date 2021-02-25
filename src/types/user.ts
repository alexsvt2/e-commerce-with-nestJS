/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Address {
    addr1: string,
    neighborhood: string,
    city: string,
    description: string
}



export interface User extends Document {
    fullName: string;
    email: string,
    phoneNumber: string,
    password: string;
    seller: boolean;
    address: Address;
    created: Date;
}