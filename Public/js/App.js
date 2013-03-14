function IndexController( $scope){

	$scope.todos = [
		{title: "Taka til í sokkaskúffunni", done: false},
		{title: "Taka til í ísskápnuum", done: false},
		{title: "Taka til í kaffivélinni", done: false}
	];

	$scope.title = "Appið mitt"
	$scope.currentDate = new Date();

}