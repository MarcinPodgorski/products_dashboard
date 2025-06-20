import { Router } from 'express';
import { addUser } from '../controllers/user';

const router = Router()

router.post('/adduser', addUser);

export default router;