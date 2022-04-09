import { Router } from "express";
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
  "/auth",
  JoiValidator(userAuthRequestSchema),
  userAuthController.handle
);

export default userRouter;
