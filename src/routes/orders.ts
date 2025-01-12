import express, { Express, Request, Response, Router } from 'express';

const todos = [
    {
      id: 1,
      desc: "Write Python code",
      completed: false,
    },
    {
      id: 2,
      desc: "Write JavaScript code",
      completed: true,
    },
    {
        id: 3,
        desc: "Write C code",
        completed: false,
    },
];

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json(todos);
})

export default router;