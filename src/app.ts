import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import { getUser, getUsers, createUser } from './db/db.ts';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);

app.get("/user/:username", async (req, res) => {
    const username = req.params.username;
    const user = await getUser(username);
    res.send(user);
});

app.post("/user", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await createUser(username, email, password);
    res.status(201).send(user);
});

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});