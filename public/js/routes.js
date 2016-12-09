var ngApp = angular.module('ngApp', ["ngRoute"]);
ngApp.config(function($routeProvider, $locationProvider) {

    var auth = {

        isLoggedIn: ['$q', '$location', '$http', function($q, $location, $http){

            var def = $q.defer();

            $http.get('/api/profile').then(function(response){
                def.resolve(response.data);
            }, function(err){
                def.reject(err);
                $location.path('/home');
                alert('Please Log In First')
            });

            return def.promise;
        }]
    };

    $routeProvider
    .when("/home", {
        templateUrl : 'templates/home.html',
        controller: 'homeCtrl'
    })
    .when('/movies', {
        templateUrl : 'templates/movies.html',
        controller: 'moviesCtrl',
        resolve: {
            user: auth.isLoggedIn,
        }
    })
    .when('/actors', {
        templateUrl : 'templates/actors.html',
        controller: 'actorsCtrl',
        resolve: {
            user: auth.isLoggedIn,
        }
    })
    .when('/sessions', {
        templateUrl : 'templates/sessions.html',
        controller: 'sessionsCtrl'
    })
    .when('/login', {
        templateUrl : 'templates/login.html',
        controller: 'loginCtrl'
    })
    .otherwise({
        redirectTo: '/login'
    });

});
