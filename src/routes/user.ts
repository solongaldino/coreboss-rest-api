import { Router } from "express";
import {
  confirmationRegisterController,
  confirmationRegisterRequestSchema,
} from "../useCases/ConfirmationRegister";
import {
  confirmPasswordRecoveryController,
  confirmPasswordRecoveryRequestSchema,
} from "../useCases/ConfirmPasswordRecovery";
import {
  isRegisteredEmailController,
  isRegisteredEmailRequestSchema,
} from "../useCases/IsRegisteredEmail";
import {
  passwordRecoveryRequestSchema,
  passworRecoveryController,
} from "../useCases/PasswordRecovery";
import {
  registerController,
  registerRequestSchema,
} from "../useCases/Register";
import { authController, authRequestSchema } from "../useCases/Auth";
import { logoutController, logoutRequestSchema } from "../useCases/Logout";
import { JoiValidator } from "../utils";
import {
  unlockLoginController,
  unlockLoginRequestSchema,
} from "../useCases/UnlockLogin";
import {
  updatePasswordController,
  updatePasswordRequestSchema,
} from "../useCases/UpdatePassword";

const userRouter = Router();

userRouter.post(
  "/isRegisteredEmail",
  JoiValidator(isRegisteredEmailRequestSchema),
  isRegisteredEmailController.handle
);

userRouter.post(
  "/register",
  JoiValidator(registerRequestSchema),
  registerController.handle
);

userRouter.post(
  "/confirmationRegister",
  JoiValidator(confirmationRegisterRequestSchema),
  confirmationRegisterController.handle
);

userRouter.post(
  "/auth",
  JoiValidator(authRequestSchema),
  authController.handle
);

userRouter.post(
  "/logout",
  JoiValidator(logoutRequestSchema),
  logoutController.handle
);

userRouter.post(
  "/passwordRecovery",
  JoiValidator(passwordRecoveryRequestSchema),
  passworRecoveryController.handle
);

userRouter.post(
  "/confirmPasswordRecovery",
  JoiValidator(confirmPasswordRecoveryRequestSchema),
  confirmPasswordRecoveryController.handle
);

userRouter.post(
  "/unlockLogin",
  JoiValidator(unlockLoginRequestSchema),
  unlockLoginController.handle
);

userRouter.post(
  "/updatePassword",
  JoiValidator(updatePasswordRequestSchema),
  updatePasswordController.handle
);

export default userRouter;
