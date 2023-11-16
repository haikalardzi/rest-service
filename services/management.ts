import UserModel from "../models/user.ts";
import { Request, Response } from "express";


const getAllUserHandler = async (req: Request, res: Response) => {
    try{
        const usermodel = new UserModel();
        const users = await usermodel.getUsers();
        if (!(users.length === 0)){
            res.status(200).json({
                status: 200,
                message: "User list sent",
                data: users,
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "Something wrongg",
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err,
        })
    }
}

export { getAllUserHandler };