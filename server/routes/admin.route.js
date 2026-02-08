import express from 'express';
import { protect, admin } from '#middlewares/auth.middleware.js';
import { getAllProductsAdmin } from '#controllers/product.controller.js';

const router = express.Router();

router.get('/products', protect, admin, getAllProductsAdmin);

export default router;
