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
                    { name: 'Person Four', value: 'Out', info: 'On PTO until 7/21/2017: Visiting family'},
                    { name: 'Person Five', value: 'Unknown', info: 'Core hours started today at 8:30AM CST'}
                ]
            }];

        $scope.user = {
            username: 'User 1',
            name: 'Person Three',
            uid: 3,
            tz: '-5:00',
            coreHours: {
                'start': 500,
                'end': 1100,
                'days': 'MTWHF'
            },
            ooo: [
                {
                    'start': '2017-07-12',
                    'end': '2017-07-12',
                    'reason': 'Onsite at a client'
                },
                {
                    'start': '2017-08-01',
                    'end': '2017-08-23',
                    'reason': 'On holiday in Paris'
                }
            ]
        }

        $scope.highlight = member => {
            return member.value == 'In' ? 'info' : member.value == 'Unknown' ? 'danger' : 'warning';
        };

        $scope.userAvailability = () => {
            return localStorage.getItem('isLoggedIn') == 'true' ? '' : 'hidden';
        }

        $scope.inOffice = () => {
            $('.btn-in-office').addClass('btn-success active');
            $('.btn-out-of-office').removeClass('active btn-danger');

            $scope.teams[0].people[2].value = 'In';
            $scope.teams[1].people[0].value = 'In';
        }

        $scope.outOfOffice = () => {
            $('.btn-in-office').removeClass('btn-success active');
            $('.btn-out-of-office').addClass('active btn-danger');

            $scope.teams[0].people[2].value = 'Out';
            $scope.teams[1].people[0].value = 'Out';
        }
    }]);