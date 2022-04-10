import { Router } from "express";
import {
  confirmationRegisterUserController,
  confirmationRegisterUserRequestSchema,
} from "../useCases/ConfirmationRegisterUser";
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
  registerUserController,
  registerUserRequestSchema,
} from "../useCases/RegisterUser";
import { authController, authRequestSchema } from "../useCases/Auth";
import { logoutController, logoutRequestSchema } from "../useCases/Logout";
import { JoiValidator } from "../utils";

const userRouter = Router();

userRouter.post(
  "/isRegisteredEmail",
  JoiValidator(isRegisteredEmailRequestSchema),
  isRegisteredEmailController.handle
);

userRouter.post(
  "/register",
  JoiValidator(registerUserRequestSchema),
  registerUserController.handle
);

userRouter.post(
  "/confirmationRegister",
  JoiValidator(confirmationRegisterUserRequestSchema),
  confirmationRegisterUserController.handle
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

export default userRouter;
