import UserModel from "../models/user.ts";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../types/user.js";

const registerHandler = async (req: Request<User>, res: Response) => {
    var username = req.body?.username;
    console.log(username);
    var email = req.body?.email;
    console.log(email);
    var password = req.body?.password;
    console.log(password);
    password = await bcrypt.hash(password!, 5);
    try{
        const usermodel = new UserModel();
        const newUser = await usermodel.createUser(username, email, password);
        if (!newUser) {
            res.status(200).json({
                message: "Register success! " + newUser,
                data: false,
            });
        } else {
            res.status(200).json({
                message: "username"+ username +"exists!",
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