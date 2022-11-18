import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      if (config.JWT_SECRET_KEY) {
        jwt.verify(token, config.JWT_SECRET_KEY);
      }
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};