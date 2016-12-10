angular.module('ngApp').controller('homeCtrl', function($scope, $http, $location) {

    $scope.noData = null;
    $scope.type = "actor";

    $http.get('/api/profile').then(function(response){
        $scope.user = response.data;
    }, function(err){
        console.error(err);
    });

    $scope.logout = function() {
        $http.get('/api/logout').then(function (result) {
            console.info(result);
            $location.path('/home');
            location.reload()
        }, function (err) {
            console.error(err);
        })
    };

    $scope.login = function(){
        $location.path('/login')
    };

    $scope.searchActors = function(){

        if(!$scope.searchText){
            alert('Enter some text');
            return;
        }

        $http.get('api/actors/' + $scope.searchText).then(function(result){

            if(!result.data.length){
                $scope.noData = "No actor found";
                return;
            }

            $scope.actors = result.data;
            $scope.noData = null;

        }, function(err){
            console.error(err);
        });

    };

    $scope.searchMovies = function(){
        if(!$scope.searchText){
            alert('Enter some text');
            return;
        }


        $http.get('api/movies/' + $scope.searchText).then(function(result){

            if(!result.data.length){
                $scope.noData = "No actor found";
                return;
            }

            $scope.movies = result.data;
            console.info($scope.movies);
            $scope.noData = null;

        }, function(err){
            console.error(err);
        });


    };

    $scope.$watch('type', function(){

        $scope.movies = null;
        $scope.actors = null;

        if($scope.type == "movie"){
            $scope.search = $scope.searchMovies;
        }

        if($scope.type == "actor"){
            $scope.search = $scope.searchActors;
        }

    })
});