import express from 'express';
//TODO: Import the authentication token from middleware and use it later on
import { signup, login, getMe, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

// Routes
router.post('/signup', signup);        // User Signup
router.post('/login', login);          // User Login
router.get('/me', /* add the imported token authentication*/ , getMe); // Get current user
router.put('/update',  /* add the imported token authentication*/ , updateUser); // Update user details

export default router;
