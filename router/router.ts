import express, { Request, Response, Express } from "express";
import { Router } from "express";
import { getAllTransactionHandler } from "../services/transaction.ts";
import { loginHandler } from "../services/login.ts";
import { registerHandler }from "../services/register.ts";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Express X Typescript: Hello world");
});

router.get("/transaction/:page", getAllTransactionHandler);
router.post("/register", registerHandler);
router.post("/login", loginHandler)

export default router;