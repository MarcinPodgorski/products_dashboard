import { Router } from 'express';
import { login } from '../controllers/auth';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.get('/me', authenticate, (req, res) => {
    
    res.json({ user: req.user });
});

export default router;