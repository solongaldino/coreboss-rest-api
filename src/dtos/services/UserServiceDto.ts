export interface ConfirmationRegisterDto {
  token: string;
}

export interface LogoutDto {
  token: string;
  userId: string;
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
