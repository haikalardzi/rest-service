import UserModel from "../models/user.ts";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { LoginRequest } from "../types/request.js";
import jwt from "jsonwebtoken";
import User from "../types/user.js";

const registerHandler = async (req: Request<User>, res: Response) => {
    const user: User = req.body;
    user.password = await bcrypt.hash(user.password!, 5);
    try{
        const usermodel = new UserModel();
        const newUser = await usermodel.create(user);
        if (!newUser) {
            res.status(200).json({
                message: "Register success! " + newUser,
                data: false,
            });
        } else {
            res.status(200).json({
                message: "username"+ user.username +"exists!",
                data: true,
            });
        }
    } catch (err){
        res.status(500).json({
            message: "Error " + err,
        });
    }
};

export { registerHandler };