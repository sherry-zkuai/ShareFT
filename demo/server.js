var PORT = 3000
var express = require('express')
//  var cors = require('cors')
var app = express()
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  next()
})
// var server = app.listen(PORT)
// console.log(server)
var server = require('http').createServer(app)
var io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    allowedHeaders: ['content-type'],
    credentials: true
  }
})
server.listen(PORT)
// var io = require('socket.io')(3000)
var roomUser = []
io.on('connection', function (socket) {
  console.log('connected')
  var currentUser
  var currentRoom

  socket.on('enter', function (username, room) {
    currentUser = username
    currentRoom = room
    if (!roomUser[currentRoom]) {
      roomUser[currentRoom] = []
    }
    if (!roomUser[currentRoom].includes(currentUser)) {
      roomUser[currentRoom].push(currentUser)
    }
    socket.join(room)
    io.in(room).emit('userEnter', roomUser[currentRoom], currentUser)
  })

  socket.on('edit', function (username, delta) {
    socket.to(currentRoom).emit('change', username, delta)
  })

  // var url=socket.request.headers.referer;
  // var split_arr=url.split('/');
  // var roomid=split_arr[-1];
  // var user='';
  // var roomUser=[];
  // socket.join(roomid);
  // socket.on('join',function(username){
  //     user=username;
  //     if(!roomUser[roomid]){
  //         roomUser[roomid]=[];
  //     }
  //     roomUser[roomid].push(user);
  //     socket.join(roomid);
  //     io.in(roomid).emit(user);
  // });
  // socket.on('edit',function(user,info){
  //     socket.to(roomid).emit('newEdit',user,info);
  // });

  // Accept a login event with user's data
  // socket.on("login", function(userdata) {
  //     socket.handshake.session.userdata = userdata;
  //     socket.handshake.session.save();
  // });
  // socket.on("logout", function(userdata) {
  //     if (socket.handshake.session.userdata) {
  //         delete socket.handshake.session.userdata;
  //         socket.handshake.session.save();
  //     }
  // });
})
// app.listen(PORT)
// http.listen(PORT)
