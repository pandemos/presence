'use strict';

// Declare app level module which depends on views, and components
angular.module('presence', [
  'angular-jwt',
  'ngRoute',
  'presence.view1',
  'presence.view2',
  'presence.version'
]).
config(function Config($httpProvider, jwtOptionsProvider) {
    jwtOptionsProvider.config({
       //tokenGetter: ['authService', function(authService) {
       tokenGetter: [function() {
           //authService.doSomething();
           return localStorage.getItem('id_token');
       }]
    });
    $httpProvider.interceptors.push('jwtInterceptor');
}).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
