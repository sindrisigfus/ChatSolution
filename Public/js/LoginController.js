app.controller('LoginController', ['$scope', '$location', function ( $scope , $location) {

	

	$scope.username = "User";
	$scope.login = function(){
	
	console.log("login: "+ $scope.username);
	socket.emit('set:name', $scope.username);
	
	$location.path('/home');
}

}]);