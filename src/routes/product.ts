import express from 'express';
import authenticate from '../middlewares/authentication';
import {admin} from '../middlewares/admin';

import { addProduct, editProduct, getProducts, deleteProduct } from '../controllers/product';
import { productValidator } from '../middlewares/input-validator';

const router = express.Router();

router.get('/products', getProducts);

router.post('/products', authenticate, admin, productValidator, addProduct);

router.put('/products/:id', authenticate, admin, productValidator, editProduct);

router.delete('/products/:id', authenticate, admin, deleteProduct);

export default router;
