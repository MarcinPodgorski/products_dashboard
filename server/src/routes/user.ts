import { Router } from 'express';
import { addUser } from '../controllers/user';
import { authenticate } from '../middleware/auth';

const router = Router()

router.post('/adduser', addUser);

export default router;