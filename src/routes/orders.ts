import { Router, Request, Response } from 'express';
import pool from '../db';
import bodyParser from 'body-parser';

const router = Router();
router.use(bodyParser.json()); 

router.get('/', async (req: Request, res: Response) => {
  try {
    // Use the shared pool to query the database
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try{
    const { order_id, image_id, customer_email, created_at, payment_method } = req.body;
    const query = 'INSERT INTO orders VALUES ($1, $2, $3, $4, $5)';
    const values = [order_id, image_id, customer_email, created_at, payment_method];
    const result = await pool.query(query, values);
    res.status(201).json({message: 'Order created successfully'});
  } catch (err) {
    console.error('Error receiving data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;