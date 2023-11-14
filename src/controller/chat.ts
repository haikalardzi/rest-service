import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { getChatHistory, addChatMessage, getFriends, addFriend } from '../db/db.ts';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Get chat history for a user
app.get('/chat_history/:username', async (req: Request, res: Response) => {

    const username = req.params.username;
    const chatHistory = await getChatHistory(username);
    res.send(chatHistory);

});

// Add a chat message
app.post('/chat_history', async (req: Request, res: Response) => {

    const { username, receiverUsername, message } = req.body;
    const updatedChatHistory = await addChatMessage(username, receiverUsername, message);
    res.send(updatedChatHistory);

});

// Get friends for a user
app.get('/friends/:username', async (req: Request, res: Response) => {
 
    const username = req.params.username;
    const friends = await getFriends(username);
    res.send(friends);
  
});

// Add a friend
app.post('/friends', async (req: Request, res: Response) => {
 
    const { user1Username, user2Username } = req.body;
    const updatedFriends = await addFriend(user1Username, user2Username);
    res.send(updatedFriends);
  
});


app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log(`Server is running at http://localhost:8080`);
});
