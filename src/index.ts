import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectToDatabase } from './database/database';
import { userRouter } from './routes/user.routes';

dotenv.config();

const port = process.env.PORT || 3000;

connectToDatabase()
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/user', userRouter);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error(error));
