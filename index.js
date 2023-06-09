const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Usuário conectado');
  
  socket.on('chat message', (msg) => {
    console.log('mensagem: ' + msg);
    io.emit('chat message', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

http.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
