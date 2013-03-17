ChatApp.controller('UsersController',
	function UsersController($scope, user ){
		$scope.Username = user.name;
		$scope.userId = user.id;
	});