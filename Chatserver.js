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

var myGlobalData = {
  rooms: [],
};

var nameList = [];
//-----------------------------------------------
// ----------------- Socket.io-------------------
//-----------------------------------------------
io = io.listen(server);
var nick = ";";
server.listen(8234);



io.sockets.on('connection', function (socket) {
    socket.on('set nickname', function (name) {
      socket.set('nickname', name, function () {
       nick = name;
       nameList.push(nick);
       socket.emit('ready'); 
        socket.broadcast.emit(nick);
     });
  
      socket.on('ferret', function (name, fn) {
         fn('woot');
      });  
  
     socket.on('getNames', function (name, fn) {
         fn(nameList);
     }); 

    });

   // validate a user's name change, and broadcast it on success
   socket.on('set:name', function (name) {  
     console.log("-----set:namee Fallid-------");

     socket.emit('set:name', name);
     socket.broadcast.emit('set:name',  name);    

     nameList.push(nick);  
  });

  socket.on('msg', function (message) {
    socket.get('nickname', function (err, name) {
      socket.set('msg' , message);
      console.log('Chat message by ', name , 'the message' , message );
    });

        socket.on('recieveNick', function (name, fen) {
        fen(nick);
    });
  });






});


//-----------------------------------------------
// -----------------End of Socket.io-------------
//-----------------------------------------------