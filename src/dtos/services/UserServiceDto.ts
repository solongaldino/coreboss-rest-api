import { UserType } from "../../enums/UserType";

export interface CreateUserDto {
    email: string;
    password: string;
    type: UserType
}