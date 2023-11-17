import mysql from "mysql2";

import User from "../types/user.js";
import { pool } from "../core/db.ts";
import { FieldPacket, OkPacket, Pool, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";


const guest: User = {
    username: "",
    email: "",
    password: "",
};

function rowsToUser(row: any): User{
    try{
        return {
            username: row.username,
            email: row.email,
            password: row.password,
        };
    } catch (err) {
        return guest;
    }
}

class UserModel {
    pool: Pool
    constructor(){
        this.pool = pool;
    }
    
    async createUser(username: any, email: any, password: any) {
        try{
            if ((await this.getUser(username)).username) {
                const result: any[] = await pool.query(`
                INSERT INTO user (username, email, password)
                VALUES (?, ?, ?)
                `, [username, email, password]);
                return username;
            }
        } catch (err: any) {
            return err;
        }
    }

    async getUser(username: any) {
        const rows : any = await pool.query(`
        SELECT * FROM user
        WHERE username = ?
        `, [username]);
        return rowsToUser(rows[0][0]);
    }

    async getUsers() {
        const rows: any[] = await pool.query(`SELECT * FROM user`);
        console.log(rows);
        return rows[0];
    }
}

export default UserModel;