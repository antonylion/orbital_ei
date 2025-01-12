import express, { Express, Request, Response } from "express";
import orders from './routes/orders';
import images from './routes/images';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/orders', orders);
app.use('/images', images);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});