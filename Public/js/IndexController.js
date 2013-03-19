
app.controller('IndexController', ['$scope','sharedProperties', function ( $scope , sharedProperties ) {
  $scope.roomname = "Room";
  $scope.roomList = [];
  var socket = sharedProperties.getSocket();
  var user = sharedProperties.getUser();


  socket.emit('getRooms');

  socket.on('getRooms', function(sroomList){
   
    $scope.$apply(function() { 
      $scope.roomList = sroomList;
    }); 

    for(var i in $scope.roomList){
     // console.log($scope.roomList[i]);
    }

  });


  $scope.createRoom = function(){

    console.log("createroom: "+ $scope.roomname);
    socket.emit('create:room', $scope.roomname, user);
  }
 /* $scope.getRooms = function(){
    socket.emit('getRooms');
  }
*/


}]);

 //  socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
