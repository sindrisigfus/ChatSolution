var app = angular.module( 'ChatApp', []);


app.config( function ( $routeProvider ) {
  $routeProvider.when( '/login', {templateUrl: '/templates/Login.html', controller: 'LoginController'}).
                 when( '/home', {templateUrl: '/templates/Home.html', controller: 'IndexController'}).
                 when( '/rooms/:id', {templateUrl: '/templates/rooms.html', controller: 'RoomController'}).
                 otherwise({redirectTo: '/login'});
});

app.service('sharedProperties', function () {     
        var socket = io.connect('http://localhost:8234');
        var user = "";

        return {     	

        	getSocket:function(){
        		return socket;
        	},

            getUser:function () {
                return user;
            },
            setUser:function (value) {
                user = value;
            }
        }
});
