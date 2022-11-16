import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
export const client = new Client();

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to ${process.env.PGDATABASE} database`);
  } catch (error) {
    console.error(`Connection to ${process.env.PGDATABASE} failed : ${error}`);
  }
};