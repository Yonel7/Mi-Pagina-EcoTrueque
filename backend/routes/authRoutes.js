import express from 'express';
import { register, login, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', protect, updateProfile);

export default router;