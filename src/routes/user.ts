import { Router } from "express";
import { JoiValidator } from "../utils";
import { authRequestSchema } from "../useCases/Auth/AuthRequestSchema";
import AuthController from "../useCases/Auth/AuthController";
import { cancelAccountRequestSchema } from "../useCases/CancelAccount/CancelAccountRequestSchema";
import CancelAccountController from "../useCases/CancelAccount/CancelAccountController";
import { confirmationRegisterRequestSchema } from "../useCases/ConfirmationRegister/ConfirmationRegisterRequestSchema";
import ConfirmationRegisterController from "../useCases/ConfirmationRegister/ConfirmationRegisterController";
import { confirmPasswordRecoveryRequestSchema } from "../useCases/ConfirmPasswordRecovery/ConfirmPasswordRecoveryRequestSchema";
import ConfirmPasswordRecoveryController from "../useCases/ConfirmPasswordRecovery/ConfirmPasswordRecoveryController";
import { isRegisteredEmailRequestSchema } from "../useCases/IsRegisteredEmail/IsRegisteredEmailRequestSchema";
import IsRegisteredEmailController from "../useCases/IsRegisteredEmail/IsRegisteredEmailController";
import { registerRequestSchema } from "../useCases/Register/RegisterRequestSchema";
import RegisterController from "../useCases/Register/RegisterController";
import { logoutRequestSchema } from "../useCases/Logout/LogoutRequestSchema";
import LogoutController from "../useCases/Logout/LogoutController";
import { passwordRecoveryRequestSchema } from "../useCases/PasswordRecovery/PasswordRecoveryRequestSchema";
import PasswordRecoveryController from "../useCases/PasswordRecovery/PasswordRecoveryController";
import { unlockLoginRequestSchema } from "../useCases/UnlockLogin/UnlockLoginRequestSchema";
import UnlockLoginController from "../useCases/UnlockLogin/UnlockLoginController";
import { updatePasswordRequestSchema } from "../useCases/UpdatePassword/UpdatePasswordRequestSchema";
import UpdatePasswordController from "../useCases/UpdatePassword/UpdatePasswordController";
import { container } from "tsyringe";

const userRouter = Router();

userRouter.post(
  "/isRegisteredEmail",
  JoiValidator(isRegisteredEmailRequestSchema),
  IsRegisteredEmailController.handle
);

userRouter.post(
  "/register",
  JoiValidator(registerRequestSchema),
  RegisterController.handle
);

userRouter.post(
  "/confirmationRegister",
  JoiValidator(confirmationRegisterRequestSchema),
  ConfirmationRegisterController.handle
);

const authController = container.resolve(AuthController);
userRouter.post("/auth", JoiValidator(authRequestSchema), (req, res, next) =>
  authController.handle(req, res, next)
);

userRouter.post(
  "/logout",
  JoiValidator(logoutRequestSchema),
  LogoutController.handle
);

userRouter.post(
  "/passwordRecovery",
  JoiValidator(passwordRecoveryRequestSchema),
  PasswordRecoveryController.handle
);

userRouter.post(
  "/confirmPasswordRecovery",
  JoiValidator(confirmPasswordRecoveryRequestSchema),
  ConfirmPasswordRecoveryController.handle
);

userRouter.post(
  "/unlockLogin",
  JoiValidator(unlockLoginRequestSchema),
  UnlockLoginController.handle
);

userRouter.post(
  "/updatePassword",
  JoiValidator(updatePasswordRequestSchema),
  UpdatePasswordController.handle
);

userRouter.post(
  "/cancelAccount",
  JoiValidator(cancelAccountRequestSchema),
  CancelAccountController.handle
);

export default userRouter;
