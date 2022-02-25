import { UserType } from "../../enums/UserType";

export interface CreateUserDto {
    email: string;
    password: string;
    type: UserType;
}

export interface ConfirmationRegisterDto {
    token: string;
}

export interface RegisterDto {
    email: string;
    password: string;
}