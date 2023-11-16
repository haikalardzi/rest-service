import mysql from "mysql2";

import User from "../types/user.js";
import { pool } from "../core/db.ts";
import { Pool } from "mysql2/promise";


const guest: User = {
    username: "",
    email: "",
    password: "",
};

class UserModel {
    pool: Pool
    constructor(){
        this.pool = pool;
    }

    public static rowsToUser(row: any): User{
        return {
            username: row.username,
            email: row.email,
            password: row.password,
        };
    }
    
    async create(user: User){
        if (this.findUser(user.username)){
            const rows: any[] = await this.pool.query(
                `INSERT INTO user (email, username, password) VALUES (?, ?, ?) RETURNING username`, 
                [user.email, user.username, user.password]
            );
            return rows[0].username;
        } else {
            return "";
        }
    }

    async findUser(username: string){
        const rows: any[] = await this.pool.query(
            `SELECT * FROM user WHERE username = ?`,
            [username]
        );
        if (rows.length == 0){
            return guest;
        } else {
            return UserModel.rowsToUser(rows[0]);
        }
    }
}

export default UserModel;