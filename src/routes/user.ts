import { Router } from "express";
import { JoiValidator } from "../utils";
import { authRequestSchema } from "../useCases/Auth/AuthRequestSchema";
import AuthController from "../useCases/Auth/AuthController";
import { cancelAccountRequestSchema } from "../useCases/CancelAccount/CancelAccountRequestSchema";
import CancelAccountController from "../useCases/CancelAccount/CancelAccountController";
import { confirmationRegisterRequestSchema } from "../useCases/ConfirmationRegister/ConfirmationRegisterRequestSchema";
import ConfirmationRegisterController from "../useCases/ConfirmationRegister/ConfirmationRegisterController";

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

userRouter.post(
  "/confirmationRegister",
  JoiValidator(confirmationRegisterRequestSchema),
  ConfirmationRegisterController.handle
);

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

userRouter.post(
  "/cancelAccount",
  JoiValidator(cancelAccountRequestSchema),
  CancelAccountController.handle
);

export default userRouter;
