import express from 'express';
import { loginController, signupController } from './user.controller';

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);

export default router;