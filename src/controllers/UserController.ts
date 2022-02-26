import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {

    public async  isRegisteredEmail(req: Request, res: Response): Promise<Response>{

        try {

            const user = await UserService.getByEmail(req.body.email);

            if(!!user)
                throw new Error("E-mail encontra-se em uso");

            return res.send({"message": "ok"});
            
        } catch (error: any) {
            return res.status(400).send({"error": error.message});
        }        
    }

    public async  register(req: Request, res: Response): Promise<Response>{

        try {

            await UserService.register({
                email: req.body.email,
                password: req.body.password,
            });

            return res.send({"message": "ok"});
            
        } catch (error: any) {
            return res.status(400).send({"error": error.message});
        }        
    }

    public async  confirmationRegister(req: Request, res: Response): Promise<Response>{

        try {

            await UserService.confirmationRegister({
                token: req.body.token
            });

            return res.send({"message": "ok"});
            
        } catch (error: any) {
            return res.status(400).send({"error": error.message});
        }        
    }

} export default new UserController;