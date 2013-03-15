function IndexController( $scope){

	$scope.todos = [
		{title: "Taka til í sokkaskúffunni", done: false},
		{title: "Taka til í ísskápnuum", done: false},
		{title: "Taka til í kaffivélinni", done: false},
		{title: "This is a totally new option okay!", done: false},
		{title: "This is a totally new option another one okay!", done: false}
	];

	$scope.title = "Appið mitt"
	$scope.currentDate = new Date();
}