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

    .controller('LoginCtrl', ['jwtHelper', '$scope', '$location', function(jwtHelper, $scope, $location) {
        $scope.doLogin = () => {
            console.log('login');
            localStorage.setItem('isLoggedIn', true);
            $location.path('/availability');
        };
    }]);