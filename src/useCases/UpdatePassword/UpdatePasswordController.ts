import { NextFunction, Request, Response } from "express";
import UpdatePasswordUseCase from "./UpdatePasswordUseCase";

class UpdatePasswordController {
  public async handle(req: Request, res: Response, next: NextFunction) {
    const { password, newPassword, userId } = req.body;
    try {
      await UpdatePasswordUseCase.run({
        password,
        newPassword,
        userId,
      });

      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default new UpdatePasswordController();
