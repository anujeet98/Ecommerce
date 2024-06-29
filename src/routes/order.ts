import express from 'express';
import { getOrder, checkout } from '../controllers/order';
import authenticate from '../middlewares/authentication';
const router = express.Router();

router.get('/order', authenticate, getOrder);
router.post('/order', authenticate ,checkout);

export default router;