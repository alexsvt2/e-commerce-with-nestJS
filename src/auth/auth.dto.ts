/* eslint-disable prettier/prettier */

import { Address } from '../types/user';

// export type WithEmail = {
//     email: string;
// }
// export type WithMobile = {
//     pgoneNumber: string;
// }


// export type LoginDTO = { password: string } & (WithEmail | WithMobile)

export interface RegisterDTO {
    fullName: string;
    password: string;
    email: string;
    phoneNumber: number;
    address?: Address;
}


// other way
type WithMobile = { password: string, email: string, phoneNumber: never }
type WithEmail = { password: string, email: string, phoneNumber: never }
export type LoginDTO = (WithEmail | WithMobile)