app.controller('RoomController', ['$scope', '$routeParams','sharedProperties', function ( $scope, $routeParams , sharedProperties) {
	var socket = sharedProperties.getSocket();
	var roomId = $routeParams.id;

	$scope.Idd = roomId;
	$scope.Names = "roomId";
	$scope.Room = {};

	socket.emit('getRoomById', roomId);

	socket.on('getRoomById', function(sRoom){

		console.log("sroom"+ sRoom);
		$scope.$apply(function() { 
			$scope.Room = sRoom;
		});
	});	
	

}]);