'use strict';

angular.module('presence.user', [
    'ngRoute',
    'angular-jwt'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'user/user.html',
            controller: 'UserCtrl'
        });

    }])

    .controller('UserCtrl', ['$location', function($location) {
        if (localStorage.getItem('isLoggedIn') != 'true') {
            $location.path('/availability');
        }
    }]);