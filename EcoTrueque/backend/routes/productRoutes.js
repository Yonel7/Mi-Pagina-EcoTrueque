import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createProduct,
  getProducts,
  getUserProducts,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, createProduct);
router.get('/user', protect, getUserProducts);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;