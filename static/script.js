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
        templateUrl: 'index.html',
        controller: 'MatrixController'
      }).
      when('/complex',{
        templateUrl: 'complex.html'
      }).
      when('/about',{
        templateUrl: 'about.html'
      }).
      otherwise({
        redirectTo: '/'
      })
}]);