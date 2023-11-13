import express from 'express';
import { createUser, getUser, getUsers } from '../db/db.ts';

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
    const users = await getUsers();
    res.json(users);
});

app.get('/users/:username', async (req, res) => {
    const user = await getUser(req.params.username);
    res.json(user);
});

app.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = await createUser(username, email, password);
    res.json(newUser);
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});