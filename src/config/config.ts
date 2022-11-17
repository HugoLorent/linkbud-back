import dotenv from 'dotenv';

dotenv.config();

const PG_USER = process.env.PGUSER;
const PG_HOST = process.env.PGHOST;
const PG_DATABASE = process.env.PGDATABASE;
const PG_PASSWORD = process.env.PGPASSWORD;
const PG_PORT = process.env.PGPORT;
const SERVER_PORT = process.env.SERVER_PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

export default {
  PG_USER,
  PG_HOST,
  PG_DATABASE,
  PG_PASSWORD,
  PG_PORT,
  SERVER_PORT,
  JWT_SECRET_KEY,
};
