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

    .controller('LoginCtrl', ['jwtHelper', function(jwtHelper) {
        localStorage.setItem('isLoggedIn', true);
    }]);