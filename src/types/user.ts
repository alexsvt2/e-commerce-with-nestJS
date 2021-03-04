/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Address {
    addr1: string,
    neighborhood: string,
    city: string,
    description: string,
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