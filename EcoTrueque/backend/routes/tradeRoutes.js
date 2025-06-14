import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  proposeTrade,
  respondToTrade,
  getUserTrades
} from '../controllers/tradeController.js';

const router = express.Router();

router.post('/', protect, proposeTrade);
router.put('/:id/respond', protect, respondToTrade);
router.get('/user', protect, getUserTrades);

export default router;