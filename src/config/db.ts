import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Creates and configures a new PostgreSQL connection pool.
 * Reads connection details from environment variables.
 * 
 * Environment variables required:
 * - DB_USER: Database username
 * - DB_HOST: Database host
 * - DB_NAME: Database name
 * - DB_PSWD: Database password
 * - DB_PORT: Database port
 * 
 * @returns A configured instance of the PostgreSQL connection pool.
 */
export const createPool = () => {
  return new Pool({
    user: process.env.DB_USER, // The database username
    host: process.env.DB_HOST, // The database host
    database: process.env.DB_NAME, // The database name
    password: process.env.DB_PSWD, // The database password
    port: Number(process.env.DB_PORT), // The database port
  });
};
