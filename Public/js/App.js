var app = angular.module( 'ChatApp', []);

app.config( function ( $routeProvider ) {
  $routeProvider.when( '/', {templateUrl: 'templates/Login.html', controller: 'LoginController'}).
                 when( '/home', {templateUrl: 'index.html', controller: 'IndexController'}).
                 when( '/rooms/:id', {templateUrl: 'templates/rooms.html', controller: 'RoomController'}).
                 otherwise({redirectTo: '/'});
});