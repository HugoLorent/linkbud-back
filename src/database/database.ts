import { Client } from 'pg';
import config from '../config/config';
export const client = new Client();

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to ${config.PG_DATABASE} database`);
  } catch (error) {
    console.error(`Connection to ${config.PG_DATABASE} failed : ${error}`);
    throw error;
  }
};
