//MathJax Configuration
MathJax.Hub.Config({
  jax: ["input/TeX", "output/HTML-CSS","output/NativeMML"],
  tex2jax:{
    displayMath: [ ['$$','$$'], ["\\[","\\]"] ]
  }
});

var app = angular.module('linAlgApp', ['ngRoute', 'linAlgControllers']);

app.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/',{
        templateUrl: 'partials/index.html',
        controller: 'MatrixController'
      }).
      when('/complex',{
        templateUrl: 'partials/complex.html'
      }).
      when('/about',{
        templateUrl: 'partials/about.html'
      }).
      otherwise({
        redirectTo: '/'
      })
}]);