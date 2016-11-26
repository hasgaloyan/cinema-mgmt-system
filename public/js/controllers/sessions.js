angular.module('ngApp').controller('sessionsCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/sessions').then(function(result) {
        $scope.sessions = result.data;

    }, function(err){
        console.error(err);
    });
}]);
