app.controller('LoginController', ['$scope', '$location','sharedProperties', function ( $scope , $location, sharedProperties) {

	var socket = sharedProperties.getSocket();
	$scope.username = "User";


	$scope.login = function(){

		console.log("login: "+ $scope.username);
		socket.emit('set:name', $scope.username);
	
		sharedProperties.setUser($scope.username);
		$location.path('/home');	
	}	



}]);