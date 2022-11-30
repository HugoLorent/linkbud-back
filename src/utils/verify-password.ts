import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user';
import config from '../config/config';
import jwt from 'jsonwebtoken';

export const verifyPassword = async (
  req: Request,
  res: Response,
  user: User
) => {
  const isPwdValid = await bcrypt.compare(req.body.password, user.password);

  if (isPwdValid) {
    if (config.JWT_SECRET_KEY) {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        config.JWT_SECRET_KEY
      );
      res.json({
        token: token,
      });
    }
  } else {
    return res.status(401).json({
      message: 'Invalid password',
    });
  }
};
