import express, { Request, Response, Express } from "express";
import { Router } from "express";
import { getAllTransactionHandler } from "../services/transaction.ts";
import { loginHandler } from "../services/login.ts";
import { registerHandler }from "../services/register.ts";
import { getAllUserHandler } from "../services/management.ts";
import UserModel from "../models/user.ts";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Express X Typescript: Hello world");
});

const user = new UserModel();

router.get("/transaction/:page", getAllTransactionHandler);
router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/users", getAllUserHandler);

export default router;