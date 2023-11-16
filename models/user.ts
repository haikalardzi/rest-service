import mysql from "mysql2";

import User from "../types/user.js";
import { pool } from "../core/db.ts";
import { Pool } from "mysql2/promise";


const guest: User = {
    username: "",
    email: "",
    password: "",
};

function rowsToUser(row: any): User{
    var rows : any;
    try {
        rows = JSON.parse(JSON.stringify(row));
    } catch (error) {
        rows = row;
    }
    return {
        username: rows.username,
        email: rows.email,
        password: rows.password,
    };
}

class UserModel {
    pool: Pool
    constructor(){
        this.pool = pool;
    }
    
    async createUser(username: any, email: any, password: any) {
        try{
            const result: any[] = await pool.query(`
            INSERT INTO user (username, email, password)
            VALUES (?, ?, ?)
            `, [username, email, password]);
            return this.getUser(username);
        } catch (err: any) {
            return err;
        }
    }

    async getUser(username: any) {
        const rows = await pool.query(`
        SELECT * FROM user
        WHERE username = ?
        `, [username]);
        console.log(Response.json(rows).json.toString);
        return rowsToUser(rows[0]);
    }

    async getUsers() {
        const rows: any[] = await pool.query(`SELECT * FROM user`);
        console.log(rows);
        return rows;
    }
}

export default UserModel;