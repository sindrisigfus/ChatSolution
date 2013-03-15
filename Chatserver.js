var http = require("http");
var url = require("url");
var fs = require("fs");
var express = require("express"),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 8000;
    
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

//app.get()
