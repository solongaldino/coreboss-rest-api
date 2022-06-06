import { Router } from "express";
import { JoiValidator } from "@utils";

import GetAdsByIdController from "@useCases/GetAdsById/GetAdsByIdController";
import { getAdsByIdRequestSchema } from "@useCases/GetAdsById/GetAdsByIdRequestSchema";
import { container } from "tsyringe";

const adsRouter = Router();

const getAdsByIdController = container.resolve(GetAdsByIdController);
adsRouter.get(
  "/ads/:id",
  JoiValidator(getAdsByIdRequestSchema),
  (req, res, next) => getAdsByIdController.handle(req, res, next)
);

export default adsRouter;
