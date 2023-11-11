// Import necessary modules
const express = require('express');
const app = express();
app.use(express.json());

// Our chat data
let chat = [];

// Get all chat messages
app.get('/chat', (req, res) => {
  res.json(chat);
});

// Post a new chat message
app.post('/chat', (req, res) => {
  const message = req.body.message;
  chat.push(message);
  res.json({ status: 'Message added', message: message });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));