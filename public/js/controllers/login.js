angular.module('ngApp').controller('loginCtrl', function($scope, $http, $location) {


    $scope.login = function(){

        var userCredentials = {
            username: $scope.username,
            password: $scope.password
        };

        console.log(userCredentials);

        $http.post('/api/users', userCredentials).then(function(response){
            console.info(response);
            $location.path('/movies');
        }, function(err){
            console.error(err);
        })
    }
});