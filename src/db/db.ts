import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export const connectToDatabase = async () => {
  const client = new Client();

  try {
    await client.connect();
    console.log(
      `Connected to ${process.env.PGDATABASE} database on http://${process.env.PGHOST}:${process.env.PGPORT}`
    );
  } catch (error) {
    console.error(`Connection to ${process.env.PGDATABASE} failed : ${error}`);
  }
};
