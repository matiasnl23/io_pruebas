const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPCTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPCTIONS, PUT, DELETE');

  next();
})

io.on('connection', (socket) => {
  //io.emit
  //socket.emit

  socket.on('new_message', (data) => {
    console.log(data);

    socket.emit('status', {
      mensaje: data.contenido,
      estado: 'bueno',
    });

    io.emit('global_message', {
      usuario: '',
      mensaje: data.contenido,
    })
  });
});

http.listen(port, () => console.log('listening on port ' + port));

/*
app.get('/', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendFile(__dirname + '/public/index.html');
});
*/
