import { Router } from "express";
import {
  confirmationRegisterUserController,
  confirmationRegisterUserRequestSchema,
} from "../useCases/ConfirmationRegisterUser";
import {
  registerUserController,
  registerUserRequestSchema,
} from "../useCases/RegisterUser";
import {
  userAuthController,
  userAuthRequestSchema,
} from "../useCases/UserAuth";
import { JoiValidator } from "../utils";

const userRouter = Router();

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

export default userRouter;
