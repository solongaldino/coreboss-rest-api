import { Request, Response } from 'express';
import AdsService from '../services/AdsService';

class AdsController {

    public async getById(req: Request, res: Response): Promise<Response>{
        try {

            const result = await AdsService.getById(req.body.id);
        
            return res.send({message: "ok", ads: result});
            
        } catch (error: any) {
            return res.status(400).send({"error": error.message});
        }
    }

} export default new AdsController;