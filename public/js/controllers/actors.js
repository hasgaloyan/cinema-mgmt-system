angular.module('ngApp').controller('actorsCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/actors').then(function(result) {
        $scope.actors = result.data;
    }, function(err){
        console.info(err)
    });
}]);
