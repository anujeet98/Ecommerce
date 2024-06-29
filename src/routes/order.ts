import express from 'express';
import { getOrder, checkout } from '../controllers/order';
import authenticate from '../middlewares/authentication';
import emailService from '../services/email';
const router = express.Router();

router.get('/order', authenticate, getOrder);
router.post('/order', authenticate ,checkout, emailService);

export default router;