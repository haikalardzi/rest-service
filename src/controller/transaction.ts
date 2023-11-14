import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { createTransaction, getTransactions } from '../db/db.ts';

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);


app.get('/transaction/:username', async (req, res) => {
 
    const username = req.params.username;
    const result = await getTransactions(username);
    res.send(result);
 });

app.post('/transaction', async (req, res) => {
    const { username, item, item_id, price, total_item, pay_total, date} = req.body;
    const newTransaction = await createTransaction(username, item, item_id, price, total_item, pay_total, date);
    res.status(201).send(newTransaction);
});


app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});
