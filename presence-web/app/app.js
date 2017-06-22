'use strict';

// Declare app level module which depends on views, and components
angular.module('presence', [
  'angular-jwt',
  'ngRoute',
  'presence.availability',
  'presence.version'
]).
config(function Config($httpProvider, jwtOptionsProvider) {
    jwtOptionsProvider.config({
       tokenGetter: [function() {
           return localStorage.getItem('id_token');
       }]
    });
    $httpProvider.interceptors.push('jwtInterceptor');
}).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/availability'});
}]);
