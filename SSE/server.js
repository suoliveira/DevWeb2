const express = require('express');
const bodyParser = require('body-parser');
const { EventEmitter } = require('events');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('.'));

const messageEmitter = new EventEmitter();

const chatMessages = [];

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const onNewMessage = (message) => {
        res.write(`data: ${JSON.stringify(message)}\n\n`);
    };
    messageEmitter.on('newMessage', onNewMessage);
    req.on('close', () => {
        messageEmitter.off('newMessage', onNewMessage);
    });
});


app.post('/message', (req, res) => {
  const { message } = req.body;
  chatMessages.push(message);
  messageEmitter.emit('newMessage', message);
  res.status(200).send('Mensagem enviada com sucesso.');
});

app.listen(port, () => {
  console.log(`Servidor do chat está rodando em http://localhost:${port}`);
});
