import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'rest_database'
}).promise();

export async function getUser(username: any) {
    const rows: any[] = await pool.query(`
    SELECT * FROM user
    WHERE username = ?
    `, [username]);
    console.log(rows[0]);
    return rows[0];
}

export async function getUsers() {
    const rows: any[] = await pool.query(`SELECT * FROM user`);
    console.log(rows);
    return rows;
}

export async function createUser(username: any, email: any, password: any) {
    const result: any[] = await pool.query(`
    INSERT INTO user (username, email, password)
    VALUES (?, ?)
    `, [username, email, password]);
    return getUser(username);
}
