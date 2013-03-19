var express = require("express"),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 8000;


var http = require("http");
var io = require('socket.io');
var url = require("url");
var fs = require("fs");

    
app.get("/", function(req, res) {
  res.redirect("/index.html");
});

var server = http.createServer(function(request, response){
  var regex = new RegExp("^/Home/Index/~$");
  var pathname = url.parse( request.url ).pathname;
  if (regex.test(pathname)){
    response.writeHead( 200, {"content-type": "text/html"});
    fs.readFile("./index.html", function(err, data){ 
      response.write(data);
      response.end( );
    });   

  }
  else{
    response.writeHead(404 ,{"content-type": "text/plain"});
    response.end( "File not found!" );
  }
});

console.log("server running at http://localhost:8000");

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(app.router);
}); 

app.listen(port);

var roomid = 0;

var roomList = [{ id: roomid, name: "MainRoom", userList:[] , op: ""}];

var nameList = [];
//-----------------------------------------------
// ----------------- Socket.io-------------------
//-----------------------------------------------
io = io.listen(server);
var nick = ";";
server.listen(8234);



io.sockets.on('connection', function (socket) {    

   // validate a user's name change, and broadcast it on success
   socket.on('set:name', function (name) {  
     console.log("-----set:namee Fallid-------");

     socket.emit('set:name', name);
     socket.broadcast.emit('set:name',  name);    

     nameList.push(nick);  
  });

  socket.on('create:room', function (roomname, opname){
      
      var room = { id: ++roomid, name: roomname, userList:["SindriSindri","DúddiMagg","Frikki Dór"] , op: opname}
      roomList.push(room);
    
      socket.broadcast.emit('getRooms', roomList);
      socket.emit('getRooms', roomList);
      

      for(var i in roomList){
        console.log(roomList[i].id, roomList[i].name ,roomList[i].op);
      }
  });

  socket.on('getRooms', function () {
      console.log("GETROOMS----------");
      socket.emit('getRooms', roomList);
      socket.broadcast.emit('getRooms', roomList);
  });

  socket.on('getRoomById', function(id){

    console.log("Get room by id ---------------------------------------------------------------------");
      for(var i = 0 ; i < roomList.length ; i++){
        if(roomList[i].id == id){    
          socket.emit('getRoomById', roomList[i]);
          break;
        }    
      }

  });

  socket.on('getRooms', function () {
      console.log("GETROOMS----------");
      socket.emit('getRooms', roomList);
      socket.broadcast.emit('getRooms', roomList);
  });

  socket.on('message', function(messageText, roomId){
    console.log(messageText);
    socket.in(roomId).broadcast.emit('updateBoard', messageText);
    socket.in(roomId).emit('updateBoard', messageText);
  });

/*  socket.on('getUsers' , function(room){

    socket.in(room.id).broadcast.emit('updateBoard', messageText);
    socket.in(room.id).emit('updateBoard', messageText);
  });*/
  

// once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', function(roomId, user) {
    roomList[roomId].userList.push(user);
    socket.emit('updatUserList', roomList[roomId].userList);
    socket.join(roomId);    
  });

 /*
// now, it's easy to send a message to just the clients in a given room
room = "abc123";
io.sockets.in(room).emit('message', 'what is going on, party people?');
 
// this message will NOT go to the client defined above
io.sockets.in('foobar').emit('message', 'anyone in this room yet?');


*/
});




//-----------------------------------------------
// -----------------End of Socket.io-------------
//-----------------------------------------------