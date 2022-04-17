import { Router } from "express";
import { JoiValidator } from "../utils";

import GetAdsByIdController from "../useCases/GetAdsById/GetAdsByIdController";
import { getAdsByIdRequestSchema } from "../useCases/GetAdsById/GetAdsByIdRequestSchema";

const adsRouter = Router();

adsRouter.get(
  "/ads/:id",
  JoiValidator(getAdsByIdRequestSchema),
  GetAdsByIdController.handle
);

export default adsRouter;
