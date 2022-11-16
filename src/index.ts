import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectToDatabase } from './db/db';
import { userRouter } from './routes/user.routes';

dotenv.config();

connectToDatabase()
  .then(() => {
    const app = express();
    const port = process.env.EXPRESS_PORT;
    app.use(cors());
    app.use('/user', userRouter);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error(error));
