import { UserType } from "../../enums/UserType";

export interface ConfirmationRegisterDto {
    token: string;
}

export interface RegisterDto {
    email: string;
    password: string;
}

export interface AuthDto {
    email: string;
    password: string;
}

export interface LogoutDto {
    token: string;
}

export interface ConfirmPasswordRecoveryDto {
    token: string;
    password: string;
}

export interface UpdatePasswordDto {
    password: string;
    newPassword: string;
    userId: string;
}

export interface CancelAccountRequestDto {
    password: string;
    userId: string;
}