import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import router from "./router/router.ts";

const app: Express = express();
const port: number = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use("/api",router);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});



