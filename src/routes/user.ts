import { Router } from "express";
import { JoiValidator } from "../utils";
import AuthController from "../useCases/Auth/AuthController";
import { authRequestSchema } from "../useCases/Auth/AuthRequestSchema";

const userRouter = Router();

// userRouter.post(
//   "/isRegisteredEmail",
//   JoiValidator(isRegisteredEmailRequestSchema),
//   isRegisteredEmailController.handle
// );

// userRouter.post(
//   "/register",
//   JoiValidator(registerRequestSchema),
//   registerController.handle
// );

// userRouter.post(
//   "/confirmationRegister",
//   JoiValidator(confirmationRegisterRequestSchema),
//   confirmationRegisterController.handle
// );

userRouter.post(
  "/auth",
  JoiValidator(authRequestSchema),
  AuthController.handle
);

// userRouter.post(
//   "/logout",
//   JoiValidator(logoutRequestSchema),
//   logoutController.handle
// );

// userRouter.post(
//   "/passwordRecovery",
//   JoiValidator(passwordRecoveryRequestSchema),
//   passworRecoveryController.handle
// );

// userRouter.post(
//   "/confirmPasswordRecovery",
//   JoiValidator(confirmPasswordRecoveryRequestSchema),
//   confirmPasswordRecoveryController.handle
// );

// userRouter.post(
//   "/unlockLogin",
//   JoiValidator(unlockLoginRequestSchema),
//   unlockLoginController.handle
// );

// userRouter.post(
//   "/updatePassword",
//   JoiValidator(updatePasswordRequestSchema),
//   updatePasswordController.handle
// );

// userRouter.post(
//   "/updatePassword",
//   JoiValidator(cancelAccountRequestSchema),
//   cancelAccountController.handle
// );

// userRouter.post("/test", TestController.handle);

export default userRouter;
