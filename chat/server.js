const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = "bot";

app.use(express.static(path.join(__dirname, 'public')));

//run when a client connects
io.on('connection', socket => {

  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // welcome current user
    // socket.emit('message', formatMessage(botName, 'welcome to app'));

    // broadcast when a user connects
    // socket.broadcast.to(user.room).emit('message', formatMessage(botName, user.username+' has joined the chat'));

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });

  });



  //  listen for chat message
  socket.on('chatMessage', (msg) => {

    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  //broadcast when client disconnects
  socket.on('disconnect', function () {
    const user = userLeave(socket.id);

    // if(user) {
    // io.to(user.room).emit('message', formatMessage(botName, user.username+'user has left the chat'));
    // }
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });


  });

});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, function () {
  console.log("server running on port " + PORT);
});
