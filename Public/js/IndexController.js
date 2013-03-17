
app.controller('IndexController', ['$scope', function ( $scope ) {

  	/*
    var socket = io.connect('http://localhost:8234');
  	var strng = "";

  	socket.on('connect', function () {
    socket.emit('set nickname', prompt('What is your nickname?'));
    socket.on('ready', function () {
      console.log('Connected !');
      socket.emit('msg', prompt('What is your message?'));
    

    socket.emit('set:name',  prompt('set name'));
    

    socket.on('set:name', function (name) {	
      console.log("VAr að setja nýtt nafn sem er: " + name); // data ll be 'woot'
   
    }); 

	socket.emit('ferret','tobi', function (data) {
      console.log("CLIENT : "+data); // data will be 'woot'm
      	 strng = data;
      	 $scope.todos.push({ title: data, done: false});
    });

	socket.emit('recieveNick','tobi', function (name) {
      console.log("CLIENT : "+name); // data ll be 'woot'
      $scope.title = name;	
    });	
	socket.emit('getNames','tobi', function (nameList) {
      for(var i = 0 ; i  < nameList.length ;i++){
      console.log("CLIENT names  : "+nameList[i]); // data will be 'woot'
     }     
    });
  });

var clientNameList = [];

$scope.getNameList = function (){
	socket.emit('getNames','tobi', function (nameList) {
       clientNameList = nameList; // data will be 'woot'         
    });
}

});
*/
$scope.name = "Sindri";
}]);

 //  socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
