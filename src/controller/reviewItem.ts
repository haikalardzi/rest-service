import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { createItemRate, getItemRate, createItemReview, getItemReview} from '../db/db.ts';

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);

app.get('/itemReview/:item_id', async (req, res) => {
    const item_id = req.params.item_id;
    const result = await getItemReview(item_id);
    res.send(result);
 });

app.post('/itemReview', async (req, res) => {
    const { id_review, item_id, review} = req.body;
    const newItemReview = await createItemReview(id_review, item_id, review);
    res.status(201).send(newItemReview);
});

app.get('/userRate/:item_id', async (req, res) => {
    const item_id = req.params.item_id;
    const result = await getItemRate(item_id);
    res.send(result);
 });

app.post('/userRate', async (req, res) => {
    const { id_rate, item_id, rate_value} = req.body;
    const newItemRate = await createItemRate(id_rate, item_id, rate_value);
    res.status(201).send(newItemRate);
});