import express from 'express';

const router = express.Router();

import  { getProfile, updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';  


router.get('/profile', authMiddleware, getProfile);
router.post('/profile', authMiddleware, updateProfile);

export default router;