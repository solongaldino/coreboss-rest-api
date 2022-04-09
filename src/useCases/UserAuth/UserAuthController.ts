import { Request, Response } from "express";
import UserAuthUseCase from "./UserAuthUseCase";

class UserAuthController {
  constructor(private userAuthUseCase: UserAuthUseCase) {}

  public async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const dataAuth = await this.userAuthUseCase.run({
        email,
        password,
      });

      return res.send({ xAccessToken: dataAuth, message: "ok" });
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }
}
export default UserAuthController;
