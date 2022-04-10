import { Router } from "express";
import {
  confirmationRegisterUserController,
  confirmationRegisterUserRequestSchema,
} from "../useCases/ConfirmationRegisterUser";
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
import {
  userAuthController,
  userAuthRequestSchema,
} from "../useCases/UserAuth";
import {
  userLogoutController,
  userLogoutRequestSchema,
} from "../useCases/UserLogout";
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
  JoiValidator(userAuthRequestSchema),
  userAuthController.handle
);

userRouter.post(
  "/logout",
  JoiValidator(userLogoutRequestSchema),
  userLogoutController.handle
);

userRouter.post(
  "/passwordRecovery",
  JoiValidator(passwordRecoveryRequestSchema),
  passworRecoveryController.handle
);

export default userRouter;
