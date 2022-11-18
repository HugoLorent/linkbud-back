import { Request, Response } from 'express';
import { client } from '../database/database';
import { User } from '../models/user';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const register = async (req: Request, res: Response) => {
  const newUser: User = req.body;

  try {
    newUser.password = await bcrypt.hash(newUser.password, 10);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error,
    });
  }

  try {
    const result = await client.query(
      'INSERT INTO l_user (u_email, u_password) VALUES ($1, $2) RETURNING *',
      [newUser.email, newUser.password]
    );
    return res.status(201).json({
      message: `User with ${result.rows[0].u_email} email was succesfully registered`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await client.query(
      'SELECT * FROM l_user WHERE u_email = $1',
      [req.body.email]
    );
    const user: User = {
      id: result.rows[0].u_id,
      email: result.rows[0].u_email,
      password: result.rows[0].u_password,
    };
    try {
      const isPwdValid = await bcrypt.compare(req.body.password, user.password);
      if (isPwdValid) {
        if (config.JWT_SECRET_KEY) {
          const token = jwt.sign(
            { id: user.id, email: user.email },
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
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      message: 'Invalid email',
    });
  }
};

export default { register, login };
