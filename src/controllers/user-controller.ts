import { Request, Response } from 'express';
import { client } from '../database/database';
import { User } from '../models/user';
import * as bcrypt from 'bcrypt';

const register = async (req: Request, res: Response) => {
  const newUser: User = req.body;

  try {
    newUser.password = await bcrypt.hash(newUser.password, 10);
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }

  try {
    const result = await client.query(
      'INSERT INTO l_user (u_login, u_password) VALUES ($1, $2) RETURNING *',
      [newUser.login, newUser.password]
    );
    res.status(201).json({
      message: `User with ${result.rows[0].u_login} login was succesfully registered`,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

export default { register };
