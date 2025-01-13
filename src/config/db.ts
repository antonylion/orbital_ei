import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const createPool = () => {
  return new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PSWD,
    port: Number(process.env.DB_PORT),
  });
}