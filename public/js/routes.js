var ngApp = angular.module('ngApp', ["ngRoute"]);
ngApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : 'templates/home.html'
    })
    .when('/movies', {
        templateUrl : 'templates/movies.html',
        controller: 'moviesCtrl'
    })
    .when('/actors', {
        templateUrl : 'templates/actors.html',
        controller: 'actorsCtrl'
    });

});
