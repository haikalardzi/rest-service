import express, { Request, Response, Express } from "express";

import { Router } from "express";

import { getAllTransactionHandler } from "../services/transaction.ts";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Express X Typescript: Hello world");
});

router.get("/transaction", getAllTransactionHandler);

export default router;