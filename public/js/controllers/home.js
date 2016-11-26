angular.module('ngApp').controller('homeCtrl', function($scope, $http) {

    $scope.noData = null;
    $scope.searchActors = function () {

        $scope.searchActors = function(){

            if(!$scope.searchText){
                return;
            }

            $http.get('api/actors/' + $scope.searchText).then(function(result){

                if(!result.data.length){
                    $scope.noData = "No actor found";
                    console.log($scope.noData);
                    return;
                }

                console.info(result);
                $scope.actors = result.data;
                $scope.noData = null;

            }, function(err){
                console.error(err);
            });

        };
    }
});