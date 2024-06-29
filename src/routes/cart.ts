import express from 'express';
import { addToCart, deleteFromCart, getCart } from '../controllers/cart';
import authenticate from '../middlewares/authentication';
const router = express.Router();

router.get('/cart', authenticate, getCart);

router.post('/cart',authenticate, addToCart);

router.delete('/cart/:itemId',authenticate, deleteFromCart);

export default router;