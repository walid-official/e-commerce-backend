import express from 'express';
import { getAllUsersController, getLoggedInUserController, loginController, signupController, updatePasswordController } from './user.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.put("/update-password", authenticate, updatePasswordController);
router.get("/me", authenticate, getLoggedInUserController); 
router.get("/", authenticate, getAllUsersController);   
    
export default router;