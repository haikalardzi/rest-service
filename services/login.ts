import UserModel from "../models/user.ts";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { LoginRequest } from "../types/request.js";
import jwt from "jsonwebtoken";

const loginHandler = async (req: Request<LoginRequest>, res: Response) => {
    const usermodel = new UserModel();
    const username = req.body?.username;
    const password = req.body?.password;
    try{
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(500).json({
                    error: err,
                });
            } else {
                const user = await usermodel.getUser(username);
                if (user) {
                    bcrypt.compare(password, user.password!, (err, result)=> {
                        if (err) {
                            res.status(401).json({
                                message: "Login failed",
                                isauthorized: false,
                            });
                            return;
                        }
                        if (result) {
                            const token = jwt.sign({
                                username: user.username,
                            },"youspeshal",
                            {
                                expiresIn: "10d",
                            });
                            
                            res.status(200).json({
                                message: "Logged in as "+ user.username,
                                token: token,
                                isauthorized: true,
                            });
                            return;
                        }
                        res.status(401).json({
                            message: "Wrong Credentials",
                            isauthorized: false,
                        });
                    });
                }
            }
        });
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};

export { loginHandler };