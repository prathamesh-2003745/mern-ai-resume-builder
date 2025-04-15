import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

// 🟢 Register
router.post('/register', registerUser);

// 🟡 Login
router.post('/login', loginUser);

// 🔴 Logout
router.get('/logout', logoutUser);

export default router;
