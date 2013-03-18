
app.controller('IndexController', ['$scope', function ( $scope ) {
  $scope.roomname = "Room";
  $scope.createroom = function(){
    console.log("createroom: "+ $scope.roomname);
    socket.emit('create:room', $scope.roomname);
  }
  $scope.getRooms = function(){
    socket.emit('getRooms', $scope.room)
  }
}]);

 //  socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
