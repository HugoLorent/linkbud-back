import * as express from 'express';
import { client } from '../db/db';
import { User } from '../models/user';

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post('/register', (req, res) => {
  const newUser: User = req.body;
  client
    .query(
      'INSERT INTO l_user (u_login, u_password) VALUES ($1, $2) RETURNING *',
      [newUser.login, newUser.password]
    )
    .then((result) => {
      console.log(result);
      res.status(201).send(`User added with id : ${result.rows[0].u_id}`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500);
    });
});
