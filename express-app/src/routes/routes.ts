import express, { Request, Response } from 'express';
import createUser from '../controllers/userController';


const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Trading Bot');
});

router.post('/users', createUser);

export default router;