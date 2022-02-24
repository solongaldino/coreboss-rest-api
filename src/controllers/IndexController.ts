import { Request, Response } from 'express';

class IndexController {

    public async index(req: Request, res: Response): Promise<Response>{

        return res.send({"token": "afsdfasdasdasddsa"});      
        
    }

} export default new IndexController;