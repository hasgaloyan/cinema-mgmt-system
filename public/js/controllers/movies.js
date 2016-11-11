angular.module('ngApp').controller('moviesCtrl', function($scope, $http) {
    $http.get('/api/movies').then(function(result) {
        $scope.movies = result.data;
    });
});
