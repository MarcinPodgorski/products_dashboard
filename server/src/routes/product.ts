import { Router } from 'express';
import { getProducts } from '../controllers/product';

const router = Router();

router.post('/products', getProducts)

export default router;