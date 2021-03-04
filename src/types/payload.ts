/* eslint-disable prettier/prettier */
export interface Payload {
    email: string;
    isAdmin:boolean,
    iat?: number;
    expiresIn?: string;
}
