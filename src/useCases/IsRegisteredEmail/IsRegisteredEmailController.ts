import { NextFunction, Request, Response } from "express";
import IsRegisteredEmailUseCase from "./IsRegisteredEmailUseCase";

class IsRegisteredEmailController {
  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await IsRegisteredEmailUseCase.run({ email });
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default new IsRegisteredEmailController();
