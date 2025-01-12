console.log("Hello world!");
// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Client } from 'pg';
import orders from './routes/orders';
import images from './routes/images';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PSWD,
    port: Number(process.env.DB_PORT),
});

async function connectAndQuery() {
    try {
        // Connect to the PostgreSQL database
        await client.connect();

        // Run a SELECT query
        const res = await client.query('SELECT * FROM orders');

        // Print the results
        console.log(res.rows);

    } catch (err) {
        console.error('Error executing query:', err);
    } finally {
        // Close the connection
        await client.end();
    }
}

app.use('/orders', orders);
app.use('/images', images);

//connectAndQuery();