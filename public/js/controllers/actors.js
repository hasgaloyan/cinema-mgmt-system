angular.module('ngApp').controller('actorsCtrl', ['$scope', '$http', 'user', function($scope, $http, user) {
    $http.get('/api/actors').then(function(result) {
        $scope.actors = result.data;
    }, function(err){
        console.info(err)
    });
}]);
