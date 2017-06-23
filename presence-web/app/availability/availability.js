'use strict';

angular.module('presence.availability', [
    'ngRoute',
    'angular-jwt'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/availability', {
            templateUrl: 'availability/availability.html',
            controller: 'AvailabilityCtrl'
        });
    }])

    .controller('AvailabilityCtrl', ['$scope', function($scope) {
        $scope.teams =
            [{
                name: 'Team One',
                people: [
                    { name: 'Person One', value: 'In'},
                    { name: 'Person Two', value: 'Out', info: 'Core hours start tomorrow at 10:00AM CST'},
                    { name: 'Person Three', value: 'In'}
                ]
            }, {
                name: 'Team Two',
                people: [
                    { name: 'Person Three', value: 'In'},
                    { name: 'Person Four', value: 'Out', info: 'On PTO until 7/21/2017'},
                    { name: 'Person Five', value: 'Unknown', info: 'Core hours started today at 8:30AM CST'}
                ]
            }];

        $scope.highlight = member => {
            return member.value == 'In' ? 'info' : member.value == 'Unknown' ? 'danger' : 'warning';
        };

        $scope.userAvailability = () => {
            return localStorage.getItem('isLoggedIn') == 'true' ? '' : 'hidden';
        }
    }]);