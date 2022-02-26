import { UserType } from "../../enums/UserType";

export interface ConfirmationRegisterDto {
    token: string;
}

export interface RegisterDto {
    email: string;
    password: string;
}