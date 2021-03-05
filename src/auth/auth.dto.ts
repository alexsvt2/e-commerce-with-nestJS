/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../types/user';

// export type WithEmail = {
//     email: string;
// }
// export type WithMobile = {
//     pgoneNumber: string;
// }


// export type LoginDTO = { password: string } & (WithEmail | WithMobile)

export class RegisterDTO {
    @ApiProperty()
    fullName: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    isAdmin:boolean;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phoneNumber: number;
    @ApiProperty()
    address?: [Address];
}


// other way
type WithMobile = { password: string, email: never, phoneNumber: number }
type WithEmail = { password: string, email: string, phoneNumber: never }
export type LoginDTO = (WithEmail | WithMobile)