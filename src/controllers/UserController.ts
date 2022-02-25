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

            await UserService.createUser(req.body.email);

            return res.send({"message": "ok"});
            
        } catch (error: any) {
            return res.status(400).send({"error": error.message});
        }        
    }

} export default new UserController;