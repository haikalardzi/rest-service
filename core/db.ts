import mysql from 'mysql2';

export const pool = mysql.createPool({
    host: "db-rest-service",
    user: 'root',
    password: 'admin',
    database: "saranghaengbok_rest"
}).promise();