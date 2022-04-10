import { Router } from "express";

const adsRouter = Router();

adsRouter.post(
  "/profile",
  JoiValidator(isRegisteredEmailRequestSchema),
  isRegisteredEmailController.handle
);

export default adsRouter;
