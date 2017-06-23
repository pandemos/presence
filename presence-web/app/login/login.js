'use strict';

angular.module('presence.login', [
    'ngRoute',
    'angular-jwt'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });

    }])

    .controller('LoginCtrl', ['jwtHelper', '$scope', '$location', '$http', function(jwtHelper, $scope, $location, $http) {
        $scope.doLogin = () => {
            console.log('login');

            var data = {
                username: $('#loginUsername').val(),
                password: $('#loginPassword').val()
            };

            $http({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: data
            }).then(response => {
                localStorage.setItem('id_token', response.data);
                localStorage.setItem('isLoggedIn', true);
                $location.path('/availability');
            }, error => {
                console.log(error)
                localStorage.setItem('isLoggedIn', false);
            });

        };
    }]);