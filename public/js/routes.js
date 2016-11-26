var ngApp = angular.module('ngApp', ["ngRoute"]);
ngApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : 'templates/home.html',
        controller: 'homeCtrl'
    })
    .when('/movies', {
        templateUrl : 'templates/movies.html',
        controller: 'moviesCtrl'
    })
    .when('/actors', {
        templateUrl : 'templates/actors.html',
        controller: 'actorsCtrl'
    })
    .when('/sessions', {
        templateUrl : 'templates/sessions.html',
        controller: 'sessionsCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });

});
