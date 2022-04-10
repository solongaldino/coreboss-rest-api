import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  public async isAuthenticated(req: Request, res: Response): Promise<Response> {
    try {
      const dataAuth = await UserService.isAuthenticated(req.body.token);

      return res.send({ isAuthenticated: dataAuth, message: "ok" });
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  public async cancelAccountRequest(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await UserService.cancelAccountRequest({
        password: req.body.password,
        userId: req.body.userId,
      });

      return res.send({ message: "ok" });
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }
}
export default new UserController();
