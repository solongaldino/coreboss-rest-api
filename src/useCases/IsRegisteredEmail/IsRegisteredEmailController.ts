import { NextFunction, Request, Response } from "express";
import IsRegisteredEmailUseCase from "./IsRegisteredEmailUseCase";

class IsRegisteredEmailController {
  constructor(private isRegisteredEmailUseCase: IsRegisteredEmailUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await this.isRegisteredEmailUseCase.run({ email });
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default IsRegisteredEmailController;
