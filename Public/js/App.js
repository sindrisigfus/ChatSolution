var app = angular.module( 'ChatApp', []);
var socket = io.connect('http://localhost::8234');

app.config( function ( $routeProvider ) {
  $routeProvider.when( '/login', {templateUrl: '/templates/Login.html', controller: 'LoginController'}).
                 when( '/home', {templateUrl: '/templates/Home.html', controller: 'IndexController'}).
                 when( '/rooms', {templateUrl: '/templates/rooms.html', controller: 'RoomController'}).
                 otherwise({redirectTo: '/login'});
});