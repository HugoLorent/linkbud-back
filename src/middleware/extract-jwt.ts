import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const extractJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
};
