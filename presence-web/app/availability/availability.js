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

    .controller('AvailabilityCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.updateData = () => {

            $http({
                method: 'GET',
                url: 'http://localhost:3000/fedata'
            }).then(response => {

                $scope.teams = response.data.teams;
                $scope.user = response.data.user;

                setTimeout($scope.updateData, 30000);
            }, error => {
                setTimeout($scope.updateData, 10000);
            });

        };

        $scope.highlight = member => {
            return member.value == 'In' ? 'info' : member.value == 'Unknown' ? 'danger' : 'warning';
        };

        $scope.userAvailability = () => {
            return localStorage.getItem('isLoggedIn') == 'true' ? '' : 'hidden';
        }

        $scope.inOffice = () => {
            $('.btn-in-office')
                .addClass('btn-success active')
                .attr('disabled', 'disabled');
            $('.btn-out-of-office')
                .removeClass('active btn-warning')
                .removeAttr('disabled');
        }

        $scope.outOfOffice = () => {
            $('.btn-in-office')
                .removeClass('btn-success active')
                .removeAttr('disabled');
            $('.btn-out-of-office')
                .addClass('active btn-warning')
                .attr('disabled', 'disabled');
        }

        $scope.updateData();
    }]);