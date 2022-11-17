import * as express from 'express';
import userController from '../controllers/user-controller';
export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
