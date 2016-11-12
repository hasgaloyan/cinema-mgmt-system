angular.module('ngApp').controller('actorsCtrl', function($scope, $http) {
    $http.get('/api/actors').then(function(result) {
        $scope.actors = result.data;
    });
});
