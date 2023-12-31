//BIG ASS SERVER

import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/pub', express.static(path.join(__dirname, 'client', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

//All users
app.get('/users', async (req, res) => {
  const data = await fs.readFile('./users.json', 'utf-8');
  const users = JSON.parse(data).users;
  return res.send(users);
});


//You can request only 1 person's data
app.get('/users/:userId', async (req, res) => {
  const data = await fs.readFile('./users.json', 'utf-8');
  const {users} = JSON.parse(data);
  const userId = parseInt(req.params.userId);
  const user = users.find(user => user.id === userId);

  if (user) {
    return res.send(user);
  } else {
    return res.status(404).send({state: 'User not found'})
  }
})

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
})