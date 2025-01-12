import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Use the shared pool to query the database
    const result = await pool.query('SELECT * FROM images');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    let imageId = req.params.id;
    let queryToGetImageDetail = 'SELECT * FROM images WHERE catalog_id = $1';
    const result = await pool.query(queryToGetImageDetail, [imageId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;