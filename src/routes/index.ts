import { Router } from 'express';
import { registerUserRoute } from '../useCases/RegisterUser';

const router = Router();

router.use('/user', registerUserRoute);

router.get('/health', (req, res) => {
  res.status(200).send('<h1 style="color:green;font-family:sans-serif">OK</h1>');
});

export default router;
