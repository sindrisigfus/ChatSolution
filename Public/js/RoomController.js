app.controller('RoomController', ['$scope', '$routeParams','sharedProperties', function ( $scope, $routeParams , sharedProperties) {
	var socket = sharedProperties.getSocket();
	var user = sharedProperties.getUser();
	var roomId = $routeParams.id;

	$scope.Idd = roomId;
	$scope.Names = "roomId";
	$scope.Room = {};
	$scope.Input = "";
	$scope.UserList = [];

	socket.emit('getRoomById', roomId);
	
	socket.on('getRoomById', function(sRoom){
		//console.log("sroom"+ sRoom);
		$scope.$apply(function() { 
			$scope.Room = sRoom;
			$scope.UserList = sRoom.UserList;
		});
	});

	socket.emit('room', roomId, user);
	socket.emit('getUsers', $scope.Room); //get userlist

	socket.on('updateUserlist', function(userList){
		console.log("updateList");
		$scope.$apply(function() { 
			$scope.UserList = userList;
		});



	});

	$scope.sendMessage = function(){ 
		socket.emit('message', $scope.Input, roomId);
		$scope.Input = "";
	}	

	socket.on('updateBoard', function(messageText){
		console.log(messageText);
	});




/////////////////////7

 
/*			
	socket.on('message', function(data) {
		console.log('Incoming message:', data);
	});

*/
}]);