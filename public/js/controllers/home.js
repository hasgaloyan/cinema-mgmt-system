/**
 * Created by has on 11/12/16.
 */
angular.module('ngApp').controller('homeCtrl', function($scope, $http) {
    $scope.searchActors = function () {
        var searchQuery = $scope.searchText;
        alert(searchQuery);
    }
});