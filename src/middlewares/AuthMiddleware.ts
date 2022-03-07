import {Request, Response, NextFunction} from 'express';
import AuthJwtService, { AuthJwtPayload } from '../services/AuthJwtService';

class AuthMiddleware{

    public async isAuthorizedIp(req: Request, res: Response, next: NextFunction){

        // if(!!!res.connection?.remoteAddress)
        //     return res.status(401).send({"error": "access not allowed - ip not found"});

        // if(res.connection?.remoteAddress !== process.env.IP_APP_FRONT_END)
        //     return res.status(401).send({"error": "access not allowed"});

        next();
    }

    public async isAuthenticated(req: Request, res: Response, next: NextFunction){

        const token = req.headers['x-access-token'];

        if(!!!token) return res.status(400).send({"error": "x-access-token not found"});

        if(token instanceof Array) return res.status(400).send({"error": "x-access-token invalid format"});

        try {

            const result: any = AuthJwtService.isAuthenticated(token);

            if(await AuthJwtService.isBlackList(token)) throw new Error("x-access-token in black list");

            req.body.userId = result.id;

        } catch (error: any) {
            
            return res.status(401).send({"error": error.message});
        }


        next();

    }

} export default new AuthMiddleware;