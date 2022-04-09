import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  public async isRegisteredEmail(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const user = await UserService.getByEmail(req.body.email);

      if (!!user) throw new Error("E-mail encontra-se em uso");

      return res.send({ message: "ok" });
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  public async confirmationRegister(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await UserService.confirmationRegister({
        token: req.body.token,
      });

      return res.send({ message: "ok" });
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  public async logout(req: Request, res: Response): Promise<Response> {
    try {
      await UserService.logout({
        token: req.body.token,
        userId: req.body.userId,
      });

      return res.send({ message: "ok" });
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  public async isAuthenticated(req: Request, res: Response): Promise<Response> {
    try {
      const dataAuth = await UserService.isAuthenticated(req.body.token);

      return res.send({ isAuthenticated: dataAuth, message: "ok" });
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  public async passwordRecoveryRequest(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await UserService.passwordRecoveryRequest(req.body.email);

      return res.send({ message: "ok" });
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  public async confirmPasswordRecovery(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await UserService.confirmPasswordRecovery({
        password: req.body.password,
        token: req.body.token,
      });

      return res.send({ message: "ok" });
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  public async unlockLogin(req: Request, res: Response): Promise<Response> {
    try {
      await UserService.unlockLogin(req.body.token);

      return res.send({ message: "ok" });
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }

  public async updatePasswordById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await UserService.updatePasswordById({
        password: req.body.password,
        newPassword: req.body.newPassword,
        userId: req.body.userId,
      });

      return res.send({ message: "ok" });
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
