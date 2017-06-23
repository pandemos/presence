'use strict';

// Declare app level module which depends on views, and components
angular.module('presence', [
    'angular-jwt',
    'ngRoute',
    'presence.availability',
    'presence.user',
    'presence.login',
    'presence.version'
])
    .config(function Config($httpProvider, jwtOptionsProvider) {
        jwtOptionsProvider.config({
            whiteListedDomains: ['localhost', 'api'],
            tokenGetter: [function() {
                return localStorage.getItem('id_token');
            }]
        });
        $httpProvider.interceptors.push('jwtInterceptor');
    })
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/availability'});
    }])
    .controller('NavCtrl', ['$scope', '$location', '$route', function($scope, $location, $route) {
        console.log($location.$$path);

        $scope.itemClass = routeName => `/${routeName}` == $location.$$path ? 'active' : '';
        $scope.availabilityItemClass = () => $scope.itemClass('availability');
        $scope.loginItemClass = () => localStorage.getItem('isLoggedIn') == 'true' ? 'hidden' : $scope.itemClass('login');
        $scope.userItemClass = () => localStorage.getItem('isLoggedIn') == 'true' ? $scope.itemClass('user') : 'hidden';
        $scope.logoutItemClass = () => localStorage.getItem('isLoggedIn') == 'true' ? '' : 'hidden';

        $scope.doLogout = () => {
            console.log('logout');
            localStorage.removeItem('id_token');
            localStorage.setItem('isLoggedIn', false);
        };

    }])
    .controller('AuthTokenCtrl', ['jwtHelper', function(jwtHelper) {
        /*var expToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8';
        var tokenPayload = jwtHelper.decodeToken(expToken);
        var date = jwtHelper.getTokenExpirationDate(expToken);
        var expired = jwtHelper.isTokenExpired(expToken);
        localStorage.setItem('id_token', expToken);*/
    }])
    .controller('ServerCtrl', ['$http', '$scope', function($http, $scope) {

        $scope.updateStatus = () => {
            $http({
                method: 'GET',
                url: 'http://localhost:3000/health'
            }).then(response => {
                $('.serverStatus')
                    .removeClass('danger')
                    .addClass('info')
                    .text('Ok');
                setTimeout(() => $scope.updateStatus(), 30000);
            }, response => {
                $('.serverStatus')
                    .removeClass('info')
                    .addClass('danger')
                    .text('Unavailable');
                setTimeout(() => $scope.updateStatus(), 10000);
            });
        }

        $scope.updateStatus();
    }]);
