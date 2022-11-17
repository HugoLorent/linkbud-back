import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './database/database';
import { userRouter } from './routes/user.routes';
import config from './config/config';

const port = config.SERVER_PORT;

connectToDatabase()
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/user', userRouter);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error(error));
