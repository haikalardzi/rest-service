import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { createUserRate, createUserReview, getUserRate, getUserReview } from '../db/db.ts';

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);

app.get('/userReview/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getUserReview(username);
    res.send(result);
 });

app.post('/userReview', async (req, res) => {
    const { id_review, username, review} = req.body;
    const newUserReview = await createUserReview(id_review, username, review);
    res.status(201).send(newUserReview);
});

app.get('/userRate/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getUserRate(username);
    res.send(result);
 });

app.post('/userRate', async (req, res) => {
    const { id_rate, username, rate_value} = req.body;
    const newUserRate = await createUserRate(id_rate, username, rate_value);
    res.status(201).send(newUserRate);
});